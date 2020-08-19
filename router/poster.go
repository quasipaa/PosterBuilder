package router

import (
    "github.com/kataras/iris/v12"
    "PosterBuilder/database"
)

func Poster(ctx iris.Context) {
    model := ctx.Values().Get("Model").(*database.Model)
    uid := ctx.Params().GetString("id")
    poster, err := model.Query(uid)
    AssertInternalServerError(err)
    ctx.ViewData("images", poster.Images)
    ctx.ViewData("title", poster.Name)
    ctx.View("index.htm")
}

func Posters(ctx iris.Context) {
    model := ctx.Values().Get("Model").(*database.Model)
    result, err := model.All()
    AssertInternalServerError(err)
    ctx.JSON(result)
}

func PosterPut(ctx iris.Context) {
    model := ctx.Values().Get("Model").(*database.Model)
    var poster database.Poster
    uid := ctx.Params().GetString("id")
    err := ctx.ReadJSON(&poster)
    AssertInternalServerError(err)
    werr := model.Write(uid, poster)
    AssertInternalServerError(werr)
}

func PosterRemove(ctx iris.Context) {
    model := ctx.Values().Get("Model").(*database.Model)
    uid := ctx.Params().GetString("id")
    err := model.Delete(uid)
    AssertInternalServerError(err)
}
