// import axios from '../axios'
import {axios,ajax} from '../config/axios'

// 用户-----------------
// 注册
export function reqAllUserLoginStatus(data){
  return axios({
    url:'admin/findAllUserCheck',
    data,
    method:'post',
    flag:true
  })
}