import axios from 'axios'
import store from '@/store'
import { message } from 'ant-design-vue'
import router from '@/router'
let instance1 = axios.create({
  baseURL:'http://www.cluster-dt.com/smtApi/',
  // baseURL: 'http://192.168.50.163:8091/smtApi/',
  // baseURL: 'http://192.168.50.30:8090/smtApi/',
  timeout: 10000
})

instance1.interceptors.request.use(config => {
  let userToken = store.state.userToken
  if (userToken) {
    config.headers['user-token'] = userToken;
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance1.interceptors.response.use(response => {
  if (response.data.code === 401) {
    message.error('用户信息已过期')
    localStorage.removeItem('user-token');
    store.dispatch('deleteUserToken')
    location.href = location.origin+location.pathname
    // router.replace({ path: '/login' })
  }
  return response

}, err => {
  return Promise.reject(err)
})

let instance2 = axios.create({
  baseURL: 'https://www.cluster-dt.com/pcwechat/',
  timeout: 10000
})

instance2.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

instance2.interceptors.response.use(response => {

  return response
}, err => {
  return Promise.reject(err)
})


export { instance1, instance2 }