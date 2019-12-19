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
// 审核通过
export const reqPassApply = (data)=>axios({
  url:'admin/userCheck',
  data,
  method:'put',
  flag:true
})
// 获取所有的用户信息
export const reqGetAllUserRoleInfo = (data)=>axios({
  url:'admin/findAllUserRole',
  data,
  method:'get',
  flag:true
})
// 修改个人的角色
export const reqModiUserRole = (data)=>axios({
  url:'admin/updateUserRole',
  method:'put',
  data,
  flag:true
})
// 重置用户密码
export const reqResetPassword =(data)=>axios({
  url:'admin/checkPassword',
  method:'put',
  data,
  flag:true
})