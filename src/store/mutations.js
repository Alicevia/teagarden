import * as TYPES from './mutations-types'

export default {
    // [TYPES.RECEIVE_ADDRESS](state,{address}){
    //     state.address = address
    // },
    // 显示与隐藏remarkdialog
    [TYPES.CHANGE_REMARK_FLAG](state){
      let {remarkFlag} = state
      state.remarkFlag = !remarkFlag
    },

    // user-------------------------
    [TYPES.GET_USER_INFO](state,payload){
      state.userInfo = payload
    },
    [TYPES.UPDATE_USER_TOKEN](state,payload){
      state.userToken = payload
    },
    [TYPES.CLEAR_USER_TOKEN](state){
      state.userToken = ''
    },
    // tea--------------------------------
    [TYPES.GET_TEA_INFO](state,payload){
      let {list=[],total} = payload
      state.teaInfo.list = list
      state.teaInfo.total = total
    },
    [TYPES.GET_TEA_DETAIL](state,payload){
      state.teaDetailInfo = payload
    },


    // 管理员---------
    [TYPES.GET_ALL_USER_APPLAY_INFO](state,payload){
      let {list=[],total} = payload
      state.allUserApplyLogin.list = list
      state.allUserApplyLogin.total = total
    },
    // admin=----------------------
    [TYPES.GET_ALL_USER_ROLE_INFO](state,payload){
      let {list=[],total} = payload
      state.allUserRoleInfo.list = list
      state.allUserRoleInfo.total = total
    },
}