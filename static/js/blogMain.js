
//这是前端的 AJAX 请求方法
var ajax = function(request) {
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

var blogTemplate = function(blog) {
    var id = blog.id
    var title = blog.title
    var author = blog.author
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var t = `
    <div class="gua-blog-cell">
        <div class="">
            <a class="blog-title" href="#" data-id="${id}">
                ${title}
            </a>
        </div>
        <div class="">
            <span>${author}</span> @ <time>${time}</time>
        </div>
        <div class="blog-comments">
            <div class='new-comment'>
                <input class='comment-blog-id' type=hidden value="${id}">
                <input class='comment-author' value="">
                <input class='comment-content' value="">
                <button class='comment-add'>添加评论</button>
            </div>
        </div>
    </div>
    `
    return t
}

var insertBlogAll = function(blogs) {
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        var t = blogTemplate(b)
        html += t
    }
    // 把数据写入 .gua-blogs 中, 直接用覆盖式写入
    var div = document.querySelector('.gua-blogs')
    div.innerHTML = html
}

var blogAll = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            console.log('响应', response)
            var blogs = JSON.parse(response)
            window.blogs = blogs
            insertBlogAll(blogs)
        }
    }
    ajax(request)
}

// 发送post qy
var blogNew = function(form) {
    // var form = {
    //     title: "测试标题",
    //     author: "gua",
    //     content: "测试内容",
    // }
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/blog/add',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            console.log('响应', response)

        }
    }
    ajax(request)
}

// 自己封装一个选择器函数
var e = function(selector) {
    return document.querySelector(selector)
}

// 绑定DOM事件函数
var bindEvents = function() {
    // 绑定发表新博客事件
    var button = e('#id-button-submit')
    button.addEventListener('click', function(event){
        console.log('click new')
        // 得到用户填写的数据
        var form = {
            title: e('#id-input-title').value,
            author: e('#id-input-author').value,
            content: e('#id-input-content').value,
        }
        // 用这个数据调用 blogNew 来创建一篇新博客
        blogNew(form)
    })
}


//建立一个主函数 避免变量污染
var __main = function() {
    // 载入博客列表
    blogAll()
    // 绑定事件
    bindEvents()
}

// 运行主函数
__main()
