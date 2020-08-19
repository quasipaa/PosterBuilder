package router

import (
    "github.com/kataras/iris/v12"
    "io/ioutil"
)

func Manage(ctx iris.Context) {
    bytes, err := ioutil.ReadFile("./views/manage.html")
    AssertInternalServerError(err)
    ctx.Write(bytes)
}
