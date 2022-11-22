### Project Clone
https://juejin.cn

### Setup
1. linters
2. mock.js - https://github.com/nuysoft/Mock/wiki/Getting-Started

### UI - Antd
https://ant.design/

### Free DB Services
MYSQL: remotemysql.com \
MONGODB: account.mongodb.com

### Next Routes
1. index \
pages/index.js -> / \
pages/blog/index.js -> /blog

2. embeded \
pages/blog/first-post.js -> /blog/first-post \
pages/dashboard/settings/username.js -> /dashboard/settings/username

3. dynamic \
pages/blog/[slug].js -> /blog/:slug \
pages/[username]/settings.js -> /:username/settings \
pages/pos/[...all].js -> /posts/*

4. TODO: \
4.1 / \
4.2 /article/[id] \
4.3 /user/[id]

### NEXTJS rendering
SSR: \
- page: Home, \
SSG: \
CSR: \

doc: \
https://github.com/vercel/next.js/discussions/11873

### NEXTJS middleware examples
https://github.com/vercel/next.js/tree/canary/examples

### NEXTJS redux
1. next-redux-wrapper \
https://github.com/kirill-konshin/next-redux-wrapper/issues/470

2. next-redux-wrapper life circle methods \
https://github.com/kirill-konshin/next-redux-wrapper#pagegetinitialprops

  - getServerSideProps vs getStaticProps
  - getInitialPageProps
  - Static Generation (Recommended): The HTML is generated at build time and will be reused on each request. To make a page use Static Generation, either export the page component, or export getStaticProps (and getStaticPaths if necessary). It's great for pages that can be pre-rendered ahead of a user's request. You can also use it with Client-side Rendering to bring in additional data
  - Server-side Rendering: The HTML is generated on each request. To make a page use Server-side Rendering, export getServerSideProps. Because Server-side Rendering results in slower performance than Static Generation, use this only if absolutely necessary.

### Github oauth app
https://github.com/settings/applications/new \
http://localhost:3000/api/oauth/redirect?code=xxx
