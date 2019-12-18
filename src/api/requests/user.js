// import axios from '../axios'
import {axios,ajax} from '../config/axios'

// 用户-----------------
// 获取用户信息
export const reqUserInfo = ()=>axios({
  url:'user/userinfo',
})
// 修改用户信息
export const reqModiUserInfo = (data)=>axios({
  url:'user/info',
  data,
  method:'put',
  flag:false
})
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


// 修改密码
export const reqModiPassword = (data)=>axios({
  url:'user/password/change',
  method:'put',
  data,
})
// 更换手机
export const reqModiPhone = (data)=>axios({
  url:'user/updatephone',
  method:'post',
  data
})