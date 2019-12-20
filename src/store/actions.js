import * as TYPES from './mutations-types'
import * as allReq from '@/api'
import { message } from 'ant-design-vue'

function detailBackCode(data,status={},callback){
  let {succeed,code} = data
  let {s='',e='服务器错误'} = status
  if (succeed) {
    if (s) {
      message.success(s)
    }
    callback && callback(data.data)
  }else{
    switch (code) {
      case -6:
        message.error('手机号已经注册，请更换手机')
        break;
      default:
        message.error(e)
        break;
    }
  }

}
export default {
  // recordUser({commit,state},userInfo){
  //     commit(TYPES.RECEIVE_USER_INFO,{userInfo})
  // },

  // 用户------------------------------------------------
  // 用户信息
  async getUserInfo({commit}){
    let {data} = await allReq.reqUserInfo()
    detailBackCode(data,{},(payload)=>{
      commit(TYPES.GET_USER_INFO,payload)
    })

  },
  // 用户注册
  async getUserRegister({},payload){
    let {data} = await allReq.reqUserRegister(payload)
    let {succeed,code} = data
    if (succeed) {
      message.success('注册成功,管理员审核中')
    }else{
      detailBackCode(data)
    }
  },
  // 用户登陆
  async getUserLogin({commit},payload){
    let {data:{succeed,code,message:status},headers}  = await allReq.reqUserLogin(payload)
    if (succeed) {
      localStorage.setItem('user-token',headers['user-token'])
      commit(TYPES.UPDATE_USER_TOKEN,headers['user-token'])
      message.success('登录成功')
      return Promise.resolve()
    }else{
      if (code===-13) {
        message.error(status)
        return
      }else if(code==-10){
        message.error(status)
        return
      }
      return Promise.reject()
    }
  },
  // 退出
  async getUserLogout({commit}){
    let {data}  = await allReq.reqUserLogout()
    detailBackCode(data,{s:'退出成功',e:'服务器错误'},()=>{
      localStorage.removeItem('user-token')
      commit(TYPES.CLEAR_USER_TOKEN)
      return Promise.resolve()
    })

  },
  // 获取usertoken
  getUserToken({commit},payload){
    commit(TYPES.UPDATE_USER_TOKEN,payload)
  },
  // 删除usertoken
  deleteUserToken({commit}){
    commit(TYPES.CLEAR_USER_TOKEN)
  },

  // 专家建议对话框
  toggleAdviseDialog({commit}){
    commit(TYPES.CHANGE_REMARK_FLAG)
  },


  // tea-------------------------------------
  // 获取所有茶园信息
  async getTeaInfo({ commit }, payload) {
    let {data}  = await allReq.reqGetTeaGardenInfo(payload)
    detailBackCode(data,{},(data)=>{
      commit(TYPES.GET_TEA_INFO, data)
    })
  },
  // 获取详情页信息
  async getTeaDetailInfo({commit},payload){
    let {data} = await allReq.reqGetTeaDetail(payload)
    detailBackCode(data,{},(payload)=>{
      commit(TYPES.GET_TEA_DETAIL,payload)
    })
  },
  // 管理员--------------------------
  // 获取正在申请登陆权限的用户
  async getAllUserApplyLoginInfo({commit},payload){
    let {data:{succeed,data}} = await allReq.reqAllUserLoginStatus(payload)
    if (succeed) {
      if (data.total===0) {
        message.warning('当前无用户')
        return
      }
      commit(TYPES.GET_ALL_USER_APPLAY_INFO,data)
    }
  },
  // admin------------------------
  // 获取所有用户的角色信息
  async getAllUserRoleInfo({commit},payload){
    let {data} = await allReq.reqGetAllUserRoleInfo(payload)
    detailBackCode(data,{},(payload)=>{
      commit(TYPES.GET_ALL_USER_ROLE_INFO,payload)
    })
  }
}