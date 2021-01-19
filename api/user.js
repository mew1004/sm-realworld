import { request } from '@/plugins/request';

//用户登录接口
const login = data => {
  return request ({
    method: 'Post',
    url: '/api/users/login',
    data
  });
}

//用户注册接口
const register = data => {
  return request ({
    method: 'Post',
    url: '/api/users',
    data
  });
}

//获取当前登录用户
const getCurrntUser = () => {
  return request ({
    method: 'Get',
    url: '/api/user'
  });
}

//修改当前登录用户信息
const updateCurrntUser = data => {
  return request ({
    method: 'Put',
    url: '/api/user',
    data
  });
}

export { login, register, getCurrntUser, updateCurrntUser}