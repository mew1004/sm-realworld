<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input 
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input requireed
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea 
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input requireed
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button :disabled="updateDisabled"
                class="btn btn-lg btn-primary pull-xs-right" 
                @click="updateUserInfo">
                Update Settings
              </button>
            </fieldset>
          </form>
          <button class="btn btn-lg btn-secondary pull-xs-left" @click="logout">
            click here to logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;
import { getCurrntUser, updateCurrntUser } from '@/api/user'
export default {
  middleware: "authenticated", //在路由匹配组件之前会先执行中间件处理
  name: "userSettings",
  async asyncData({ query, store }) {
    const { data } = await getCurrntUser();
    return { user: data.user }
  },
  data() {
    return {
      updateDisabled: false
    }
  },
  methods: {
    async updateUserInfo() {
      this.updateDisabled = true;
      await updateCurrntUser({user: this.user});
      this.updateDisabled = false;
      
      this.$router.push('/'); //跳转到首页
    },
    logout() {
      this.$store.commit('setUser', null); //清除用户登录状态
      Cookie.remove('user'); //去持久化
      this.$router.push('/'); //跳转到首页
    }
  }
};
</script>

<style>
</style>