<template>
  <div class="content-item">
    <div class="current-position">
      <span @click="goBack" class="iconfont" style="cursor:pointer">&#xe62c;当前位置: 列表/详情页</span>
      <div class="detail-operate">
        <a-button
          type="primary"
          @click="showRemarkDialog"
          style="borderRadius:16px;backgroundColor:#EEEEEE;color:#000000;border:none"
        >
          <span class="iconfont" style="fontSize:14px">&#xe68d;</span>
          <span style="marginLeft:6px">{{professorTitle}}</span>
        </a-button>
        <a-button type="primary" style="borderRadius:16px" ghost @click="modiTeaNatureInfo">
          <span class="iconfont" style="fontSize:14px">&#xe65b;</span>
          <span style="marginLeft:6px">提交</span>
        </a-button>

        <a-button
          v-if="teaDetailInfo.teaGardenSubscribeId"
          type="primary"
          style="borderRadius:16px"
          @click="unSubscribeTea"
          ghost
        >
          <span class="iconfont" style="fontSize:14px">&#xe602;</span>
          <span style="marginLeft:6px">已订阅</span>
        </a-button>
        <a-button v-else  type="primary" style="borderRadius:16px" @click="subscribeTea">
          <span class="iconfont" style="fontSize:14px">&#xe65b;</span>
          <span style="marginLeft:6px">订阅</span>
        </a-button>
      </div>
    </div>
    <div class="detail-container">
      <NatureGeoForm ref="nature" :tea="teaDetailInfo"></NatureGeoForm>
      <Comment commentTitle="用户备注" :comments="teaDetailInfo.userRemarks"></Comment>
      <Comment commentTitle="专家建议" :comments="teaDetailInfo.expertRemarks"></Comment>
      <RemarkDialog ref="detailRemark" :theme="professorTitle" :comment="{}"></RemarkDialog>
    </div>
  </div>
</template>

<script>
import RemarkDialog from 'home/components/remarkDialog'
import NatureGeoForm from 'home/components/natureGeoForm'
import Comment from 'home/components/comment'
import * as TYPES from '@/store/mutations-types'
import {reqGetTeaDetail,reqUnSubscribeTea,reqSubscribeTea} from '@/api'
import utils from '../../../../utils'
import { mapState, mapActions } from 'vuex'
export default {
  // props: ["detail"],
  data() {
    return {
      
      remarkTitle:'用户备注'
    };
  },

  computed: {
    ...mapState(['userInfo','teaDetailInfo']),
    professorTitle(){
      return this.userInfo.roleId===3?"专家建议":"用户备注"
    }
  },

  mounted() {},
  activated() {
      this.getTeaDetailInfo({teaGardenId:this.$route.query.id})
  },

  methods: {
    ...mapActions(['getTeaDetailInfo']),
    showRemarkDialog(){
      this.$refs['detailRemark'].showModal()
      // this.$store.commit(TYPES.CHANGE_REMARK_FLAG)
    },
    goBack() {
      this.$router.go(-1);
    },
    async subscribeTea(){
      let {data} = await reqSubscribeTea({teaGardenId:this.$route.query.id})
      utils.detailBackCode(data,{s:'订阅成功'},()=>{
        this.getTeaDetailInfo({teaGardenId:this.$route.query.id})
      })
    },
    async unSubscribeTea(){
          let {data} = await reqUnSubscribeTea({teaGardenId:this.$route.query.id})
      utils.detailBackCode(data,{s:'已取消订阅'},()=>{
        this.getTeaDetailInfo({teaGardenId:this.$route.query.id})
      })
    },
    modiTeaNatureInfo(){
      this.$refs['nature'].changeTeaInfo()
    }

  },

  components: {NatureGeoForm,Comment,RemarkDialog}
};
</script>
<style lang='stylus' scoped>
.detail-operate
  width 290px
  display flex
  justify-content space-between
  align-items center
  margin-right 107px
.detail-container
  padding 10px 107px 0
  background-color #fff
</style>