package router

import (
    "github.com/kataras/iris/v12"
    "os"
    "io"
)

func Upload(ctx iris.Context) {
    dir := ctx.Values().Get("AppData").(string)
    name := ctx.URLParam("name")
    file, _, err := ctx.FormFile("image")
    AssertInternalServerError(err)
    defer file.Close()
    out, oerr := os.OpenFile(dir + name, 
        os.O_WRONLY | os.O_CREATE, 0755)
    AssertInternalServerError(oerr)
    defer out.Close()
    io.Copy(out, file)
}