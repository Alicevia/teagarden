// import axios from '../axios'
import {axios,ajax} from '../config/axios'

// 用户-----------------
// 注册
export const reqTeaGardenInfo = (data)=>axios({
  url:'teaGarden/teaGardenInformation',
  method:'get',
  data,
  flag:true
})