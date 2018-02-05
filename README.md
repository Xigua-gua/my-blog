# my-blog
基于node,js和express 建立的简易博客模板框架
新手练手 
熟悉一下前后端建立接口的思路

使用下面的功能实现博客程序
node
express
ajax
文件分布如下
- appBlog.js      后端程序接口的主文件

/model  处理数据的文件夹
- blog.js           处理 blog 数据存取的文件
- comment.js        处理 comment 数据的文件

/db     存放数据的文件夹
- comment.json      存储 comment (评论区)数据的文件
- blog.json         存储 blog 数据的文件

/route  处理数据的路由 文件

/template  前端页面
- blog_index.html   博客主页的 html 文件
- blog_detail.html  博客详情页面 html 文件

运行程序方式     node appBlog.js

可以根据自己的喜好 进行CSS页面布局
