package database

import (
    "github.com/syndtr/goleveldb/leveldb"
    "encoding/json"
)

type Result struct {
    Poster Poster `json:"poster"`
    Uid    string `json:"uid"`
}

type Poster struct {
    Images []string `json:"images"`
    Detil  string   `json:"detil"`
    Name   string   `json:"name"`
    Date   int64    `json:"date"`
}

type Model struct {
    db *leveldb.DB
}

func Default() Model {
    return Model{}
}

func New(temp string) Model {
    db, err := leveldb.OpenFile(temp, nil)
    if err != nil { panic(err) }
    return Model{db}
}

func (m *Model) Query(uid string) (Poster, error) {
    poster := Poster{}
    result, err := m.db.Get([]byte(uid), nil)
    if err != nil { return poster, err }
    perr := json.Unmarshal(result, &poster)
    return poster, perr
}

func (m *Model) Write(uid string, p Poster) error {
    data, err := json.Marshal(p)
    if err != nil { return err }
    return m.db.Put([]byte(uid), data, nil)
}

func (m *Model) Delete(uid string) error {
    return m.db.Delete([]byte(uid), nil)
}

func (m *Model) All() ([]Result, error) {
    var results []Result
    iter := m.db.NewIterator(nil, nil)
    for iter.Next() {
        poster := Poster{}
        uid := string(iter.Key())
        value := iter.Value()
        err := json.Unmarshal(value, &poster)
        if err != nil { return results, err }
        result := Result{Poster: poster, Uid: uid}
        results = append(results, result)
    }
    
    iter.Release()
    return results, nil
}
