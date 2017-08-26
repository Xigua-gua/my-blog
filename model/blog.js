
// 该模块 用于处理所有博客的操作数据
// 这里可以创建各种方法 来处理博客数据


// 引入 fs 文件处理包
var fs = require('fs')

// 得到数据库 blog.json
var blogFilePath = 'db/blog.json'


// i创建一个用来存储 Blog 数据的对象
const ModelBlog = function(form) {
    // || 是一种新的写法  2选一
    // a = b || c 意思是如果 b 是 undefined 或者 null 就把 c 赋值给 a
    // 设置 博客各个属性
    this.title = form.title || ''
    this.author = form.author || ''
    this.content = form.content || ''
    // 设置博客的  生成 时间---是指博客被服务器收录的时间
    this.created_time = Math.floor(new Date() / 1000)
}

// 加载博客数据
const loadBlogs = function() {
    // 确保文件有内容, 这里就不用处理文件不存在或者内容错误的情况
    // 用同步方法,来读取数据库数据并解析返回
    var content = fs.readFileSync(blogFilePath, 'utf8')
    var blogs = JSON.parse(content)
    return blogs
}

/*
b 这个对象是导出给别的代码用的对象
它有一个 data 属性用来存储所有的 blogs 对象
它有 all 方法返回一个包含所有 blog 的数组
它有 new 方法来在数据中插入一个新的 blog 并且返回
他有 save 方法来保存更改到文件中
*/
var b = {
    data: loadBlogs()
}

b.all = function() {
    // 这里的 this.data 就是 b.data 所有的博客数据 loadBlogs()
    var blogs = this.data
    // 遍历blogs 中所有的 blog， 并插入相应的评论 comments
    //这里引入 处理 评论区数据的 中间件 comment.js
    const comment = require('./comment')
    // 使用 comment.js 中的all() 方法得到所有评论,
    var comments = comment.all()
    // 遍历所有博客数据
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        // 创建一个空数组 来保存与博客相匹配的所有评论数据
        var cs = []
        // 再遍历所有评论区的数据根据blog_id 来匹配相应的博客
        for (var j = 0; j < comments.length; j++) {
            var c = comments[j]
            if (blog.id == c.blog_id) {
                cs.push(c)
            }
        }
        // 将该数据 更新数据库(blog.json)中该博客的comments属性中
        blog.comments = cs
    }
    // 返回所有的博客数据
    return blogs
}

// 这是处理前端请求 添加博客的方法/解析
b.new = function(form) {
    // 创建一个 新的博客实例
    var m = new ModelBlog(form)
    // console.log('new blog', form, m)
    // 设置新数据的 id,这里的 d 是指 数据库中最后一个blog对象
    var d = this.data[this.data.length-1]
    // 如果d这个数对象不存在说明数据库中没有博客,那么这个新建的博客就是第一个博客
    // 所以将其 对应的id 设为1
    // 否则就将其id的只在已有的数据库中的值上加1
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    // 把 该博客数据 加入 this.data 数组
    this.data.push(m)
    // 把 最新数据 保存到文件中
    this.save()
    // 返回新建的博客数据
    return m
}

b.save = function() {
    // 序列化所有的 blog  数据
    var s = JSON.stringify(this.data)
    // 将该数据 写入 数据库(blog,json )
    fs.writeFile(blogFilePath, s, (err) => {
      if (err) {
          console.log(err)
      } else {
          console.log('保存成功')
      }
    })
}

// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了
module.exports = b
