import * as TYPES from './mutations-types'

export default {
    // [TYPES.RECEIVE_ADDRESS](state,{address}){
    //     state.address = address
    // },
    // 显示与隐藏remarkdialog
    [TYPES.UPDATE_USER_TOKEN](state,payload){
      state.userToken = payload
    },
    [TYPES.CLEAR_USER_TOKEN](state){
      state.userToken = ''
    },
    [TYPES.CHANGE_REMARK_FLAG](state){
      let {remarkFlag} = state
      state.remarkFlag = !remarkFlag
    },
    [TYPES.GET_TEA_INFO](state,payload){
      state.teaInfo = payload
    },



    // admin---------
    [TYPES.GET_ALL_USER_APPLAY_INFO](state,payload){
      let {list=[],total} = payload
      state.allUserApplyLogin.list = list
      state.allUserApplyLogin.total = total
    }
}