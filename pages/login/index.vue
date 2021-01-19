<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, filed) in errors">
              <li v-for="(message, index ) in messages" :key="index">{{ filed }} {{message}}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input required
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input required
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                placeholder="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input required
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user';
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'notAuthenticated', //在路由匹配组件之前会先执行中间件处理
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin ? await login({ user: this.user }) : await register({ user: this.user });
        this.$store.commit('setUser', data.user); //保存用户登录状态
        Cookie.set('user', data.user); //数据持久化
        this.$router.push('/'); //跳转到首页
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    }
  }
};
</script>

<style>
</style>