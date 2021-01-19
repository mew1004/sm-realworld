/**
 * 验证用户是否登录的中间件
 */
export default function ({ store, redirect }) {
  //用户没有登录，重定向到登录页面
  if (!store.state.user) {
    return redirect('/login')
  }
}