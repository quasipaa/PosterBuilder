package command

import "flag"

type Configure struct {
    AppData string
    Port string
    Db string
}

func (c *Configure) Parse() {
    flag.StringVar(&c.AppData, "a", "./data", "文件缓存目录")
    flag.StringVar(&c.Db, "d", "./data", "数据库存储目录")
    flag.StringVar(&c.Port, "p", "8080", "绑定端口")
    flag.Parse()
}
