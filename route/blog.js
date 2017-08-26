
// 这是个人博客的 添加/获取 博客的中间件(方法)
// 引入中间件/模块  model/blog.js
const blog = require('../model/blog')



// 服务器得到前端发送来的get请求 (博客的所有数据) 和 请求路径'/api/blog/all', 反馈/发送数据给浏览器
//这个方法是根据路由 返回所有博客的数据 并发送前端,之后由前端做渲染显示在页面
var all = {
    path: '/api/blog/all',
    method: 'get',
    func: function(request, response) {
        var blogs = blog.all()
        var r = JSON.stringify(blogs)
        response.send(r)
    }
}

// 服务器得到前端发送来的post请求和 请求路径'/api/blog/add',反馈/发送数据给浏览器
//这个请求是 添加博客的请求,服务器后端进行处理
// 将数据做相应处理后储存在数据库(blog.json) --> 向前端(浏览器)发送处理后的数据--->浏览器根据所得数据做相应的编程处理后渲染到页面
// 这个方法是根据路由 返回添加新建的blog数据
var add = {
    path: '/api/blog/add',
    method: 'post',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var form = request.body
        // 插入新数据并返回
        // 验证密码 是否正确
        if(form.mima == '') {
            // 如果密码正确再调用 中间件 blog 来处理前端的请求数据并序列化返回数据
            var b = blog.new(form)
            var r = JSON.stringify(b)
        } else {
            //否则
            var r = JSON.stringify({

            })
        }
        response.send(r)
    }
}

var routes = [
    all,
    add,
]

module.exports.routes = routes
