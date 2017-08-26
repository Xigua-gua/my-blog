
// 创建此文件为 处理model/comment.js中的数据 建立路由

// 引入评论区的数据处理模块  comment.js
const comment = require('../model/comment')
//这个comment 是评论区的数据处理方法 模块(会根据相应的方法来返回评论区的数据)

// 这个方法是根据路由   返回博客评论区的所有数据
var all = {
    path: '/api/comment/all',
    method: 'get',
    func: function(request, response) {
        // 根据该请求得到所有的评论  所有的评论数据使用之前创建的comments.js模板(中的all方法)来处理
        var comments = comment.all()
        var r = JSON.stringify(comments)
        response.send(r)
    }
}

//这个方法是根据路由 返回新建评论的数据
var add = {
    path: '/api/comment/add',
    method: 'post',
    func: function(request, response) {
        // 浏览器发过来的数据 为 form (表单),取数据中的request.body得到数据主体
        var form = request.body
        // 插入新数据    这个数据使用之前创建的comments.js模板(中的new方法)来处理
        var b = comment.new(form)
        // 序列化 该评论数据,并将数据send 给前端
        var r = JSON.stringify(b)
        response.send(r)
    }
}

var routes = [
    all,
    add,
]
//
module.exports.routes = routes
