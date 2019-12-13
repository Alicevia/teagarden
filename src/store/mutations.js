import * as TYPES from './mutations-types'

export default {
    // [TYPES.RECEIVE_ADDRESS](state,{address}){
    //     state.address = address
    // },
    // 显示与隐藏remarkdialog
    [TYPES.CHANGE_REMARK_FLAG](state){
      let {remarkFlag} = state
      state.remarkFlag = !remarkFlag
    }
}