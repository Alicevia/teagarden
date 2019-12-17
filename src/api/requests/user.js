// import axios from '../axios'
import {axios,ajax} from '../config/axios'

// 用户-----------------
// 注册
export function reqUserRegister(data){
  return axios({
    url:'register/registerAccount',
    data,
    method:'post',
  })
}
// 登陆
export const reqUserLogin = (data)=>axios({
  url:'register/login',
  data,
  method:'post'
})
//退出
export const reqUserLogout = ()=>axios({
  url:'register/logout',
  method:'get'
})
