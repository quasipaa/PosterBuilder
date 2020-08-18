# PosterBuilder

这是使用Golang编写的海报生成器,
专门用来生成可扫描二维码进入的海报活动页.


### 生成项目

从Git仓库获取源代码并编译:
```bash
git clone https://github.com/quasipaa/PosterBuilder
cd PosterBuilder
go build
```

编译完成之后当前目录下面会出现可执行文件:
```bash
chmod +x ./PosterBuilder
./PosterBuilder
```


### 启动

可通过命名行参数启动服务器.</br>
获取参数帮助:
```bash
./PosterBuilder -h
```

* `-a` `string` 文件缓存目录 (default "./data")</br>
* `-d` `string` 数据库存储目录 (default "./data")</br>
* `-p` `string`  绑定端口 (default "8080")</br>

启动示例:
```bash
./PosterBuilder -a /data/AppData -d /data/databse -p 80
```
这将启动服务器并监听`0.0.0.0:80`端口.
以`/data/AppData`作为图片文件存储目录.
数据库文件存储在`/data/databse`目录.

### License
[MIT](./LICENSE)
Copyright (c) 2020 Mr.Panda.