/**
 * 配置自定义路由表规则
 */
module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.splice(0);//清除nuxtjs根据Pages目录生成的默认路由
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', //默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor/:slug',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        }
      ]); 
    }
  },
  //最简单方式
  server: {
    host: '0.0.0.0', //设置为'0.0.0.0'会监听所有的网卡地址，使其能够对外进行访问
    port: 3000
  },
  //注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}