# micro-app-demo
微前端技术 micro-app 实践demo

# 是什么
示例主要用于展示如何在主应用中,以微前端的方式加载子应用 a,b,并且通过固定不变的服务名来请求子应用资源，
而不用 hardcode 子应用的 ip 地址

# 项目结构
- main 主应用
- sub-a 子应用 a
- sub-b 子应用 b


# 运行方式
`docker-compose up -d` ，然后访问浏览器 `http://localhost` 即可访问主应用

通过`http://localhost/sub-a`经过主应用代理来访问子应用a
通过`http://localhost/sub-b`经过主应用代理来访问子应用b
通过`http://localhost:81/sub-a`直接访问子应用a
通过`http://localhost:82/sub-b`直接访问子应用b

# 注意事项
子应用需要静态资源上下文不能为`/`(例：在vue2应用中为`publicPath`)，以区分开子应用的静态资源与主应用的静态资源。
在上面例子中，子应用a的直接访问方式是`http://localhost:81/sub-a`,因为在 子应用 a 中`vue.config.js`中将
`publicPath`设置为`'sub-a'`。
