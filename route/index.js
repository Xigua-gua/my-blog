
// ,服务器根据 前端的 get请求 返回给浏览器数据的方法  路由
// 创建此文件为 向前端发送主页数据 建立路由


var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path,  function(err, data){
        console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}

var index = {
    path: '/',
    method: 'get',
    func: function(request, response) {
        var path = 'blog_index.html'
        sendHtml(path, response)
    }
}

var routes = [
    index,
]

module.exports.routes = routes
