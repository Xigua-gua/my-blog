// 引入 express 并且创建一个 express 实例赋值给 app

// 所有的require 方法都是 引入一个框架/模板/中间件
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

// 配置静态文件目录
app.use(express.static('static'))

// 建立 前后端数据交互的接口
const registerRoutes = function(app, routes) {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        // routes[0] == routes.all
        // 此时的 route 为文件夹route 里的各个JS中间件的路由方法
        app[route.method](route.path, route.func)
        // i = 0时app.get('/api/blog/all',routes.all.func)
    }
}

// 导入 route/index.js 的所有路由数据
const routeIndex = require('./route/index')
registerRoutes(app, routeIndex.routes)

// 导入 route/blog 的所有路由数据
const routeBlog = require('./route/blog')
registerRoutes(app, routeBlog.routes)

// 导入 route/comment 的所有路由数据
const routeComment = require('./route/comment')
registerRoutes(app, routeComment.routes)
// 这里还可以更加简化 路由接口的处理方法
// const routeModules = [
//     './route/index',
//     './route/blog',
//     './route/comment',
// ]




// listen 函数的第一个参数是监听端口
// 默认的端口是 80
// 1024 以下的端口是系统保留端口，需要管理员权限才能使用
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
