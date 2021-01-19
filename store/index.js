const cookieparser = process.server ? require('cookieparser') : undefined;
/**
 * 在服务端运行期间都是同一个实例
 * 为了防止数据命名冲突，要把state定义成一个函数，返回数据对象
 */
const state = () => {
  return {
    user: null //当前登录用户的登录态
  }
}

const mutations = {
  setUser(state, data) {
    state.user = data;
  }
}

const actions = {
  /**
   * nuxtServerInit是nuxt特有的action方法，只会在服务端渲染期间自动调用
   * 作用：初始化容器数据，传递给客户端使用
   */
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    //如果请求头中有cookie
    if (req.headers.cookie) {
      //使用cookieparser将cookie字符串转换为js对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}

export { state, mutations, actions }