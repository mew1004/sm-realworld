export default function ({ store, redirect }) {
  //用户已经登录过了，直接跳转到首页
  if (store.state.user) {
    return redirect('/')
  }
}