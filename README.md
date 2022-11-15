### Juejin.cn Clone

### Setup
1. linters
2. mock.js
https://github.com/nuysoft/Mock/wiki/Getting-Started

### UI - Antd
https://ant.design/

### Next Routes
1. index
pages/index.js -> / \
pages/blog/index.js -> /blog

2. embeded
pages/blog/first-post.js -> /blog/first-post \
pages/dashboard/settings/username.js -> /dashboard/settings/username

3. dynamic
pages/blog/[slug].js -> /blog/:slug \
pages/[username]/settings.js -> /:username/settings \
pages/pos/[...all].js -> /posts/*

4. TODO:
4.1 / \
4.2 /article/[id] \
4.3 /user/[id]
