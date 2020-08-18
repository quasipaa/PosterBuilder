package main

import (
    "github.com/kataras/iris/v12"
    "PosterGeneration/database"
    "PosterGeneration/command"
    "PosterGeneration/router"
)

func main() {
    conf := command.Configure{}
    (&conf).Parse()
	app := iris.Default()
    model := database.New(conf.Db)
    app.HandleDir("/AppData", conf.AppData)
    app.HandleDir("/static", "./views/static")
	app.RegisterView(iris.HTML("./views", ".htm"))
    app.UseGlobal(router.Middleware(&model, conf.AppData))
    app.OnErrorCode(iris.StatusInternalServerError, router.InternalServerError)
    app.Delete("/poster/{id:string}", router.PosterRemove)
    app.Post("/poster/{id:string}", router.PosterPut)
    app.Get("/poster/{id:string}", router.Poster)
    app.Get("/posters", router.Posters)
    app.Post("/upload", router.Upload)
    app.Get("/manage", router.Manage)
	app.Listen(":" + conf.Port)
}
