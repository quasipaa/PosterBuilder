package router

import (
    "github.com/kataras/iris/v12"
    "PosterBuilder/database"
)

func Middleware(model *database.Model, appdata string) func(ctx iris.Context) {
    return func(ctx iris.Context) {
        ctx.Values().Set("AppData", appdata)
        ctx.Values().Set("Model", model)
        ctx.Next()
    }
}

func InternalServerError(ctx iris.Context) {
    ctx.StatusCode(400)
    ctx.Writef("")
}

func AssertInternalServerError(err error) {
    if err != nil {
        panic(err)
    }
}
