// import axios from '../axios'
import {axios,ajax} from '../config/axios'

// tea-----------------
// 获取茶园信息
export const reqGetTeaGardenInfo = (data)=>axios({
  url:'teaGarden/teaGardenInformation',
  method:'get',
  data,
  flag:true
})

// 订阅
export const reqSubscribeTea = (data)=>axios({
  url:'subscribe/subscribeTeaGarden',
  data,
  method:'post',
  flag:'true'
})
//取消订阅
export const reqUnSubscribeTea = (data)=>axios({
  url:'subscribe/unSubscribe',
  data,
  method:'post',
  flag:'true'
})
// 获取茶园详情
export const reqGetTeaDetail = (data)=>axios({
  url:'teaGarden/teaGardenDetails',
  data,
  method:'get',
  flag:true
})
// 修改茶园详情
export const reqModiTeaDetail = (data)=>axios({
  url:'teaGarden/modifyTeaGardenInformation',
  data,
  method:'put',
})

// 添加备注信息
export const reqAddRemark = (data)=>axios({
  url:`postscript/addRemark`,
  data,
  method:'post',
  flag:false
})