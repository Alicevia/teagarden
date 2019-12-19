<template>
  <div class="content-item">
    <div class="current-position">
      <span @click="goBack" class="iconfont" style="cursor:pointer">&#xe62c;当前位置: 列表/详情页</span>
      <div class="detail-operate">
         <a-button type="primary" @click="showRemarkDialog"
          style="borderRadius:16px;backgroundColor:#EEEEEE;color:#000000;border:none">
          <span class="iconfont" style="fontSize:14px">&#xe68d;</span>
          <span style="marginLeft:6px">备注</span>
        </a-button>
         <a-button type="primary" style="borderRadius:16px" ghost>
          <span class="iconfont" style="fontSize:14px">&#xe65b;</span>
          <span style="marginLeft:6px">提交</span>
        </a-button>
        <a-button type="primary" style="borderRadius:16px"  @click="subscribeTea">
          <span class="iconfont" style="fontSize:14px">&#xe65b;</span>
          <span style="marginLeft:6px">订阅</span>
        </a-button>
      </div>
    </div>
    <div class="detail-container">
      <NatureGeoForm :tea='detail'></NatureGeoForm>
      <Comment commentTitle="用户备注"></Comment>  
      <Comment  commentTitle="专家建议"></Comment>  
        <RemarkDialog></RemarkDialog>
    </div>
  </div>
</template>

<script>
import RemarkDialog from 'home/components/remarkDialog'
import NatureGeoForm from 'home/components/natureGeoForm'
import Comment from 'home/components/comment'
import * as TYPES from '@/store/mutations-types'
import {reqGetTeaDetail} from '@/api'
import utils from '../../../../utils'
export default {
  // props: ["detail"],
  data() {
    return {
      detail:''
    };
  },

  computed: {},

  mounted() {},
  async activated() {
    // console.log(this.detail)
    let {data} = await reqGetTeaDetail({teaGardenId:this.$route.query.id})
    utils.detailBackCode(data,{},(payload)=>{
      console.log(payload)
      this.detail = payload
    })
  },

  methods: {
    showRemarkDialog(){
      this.$store.commit(TYPES.CHANGE_REMARK_FLAG)
    },
    goBack() {
      this.$router.go(-1);
    },
    subscribeTea(){
      console.log(this.$route.path)
    }
  },

  components: {NatureGeoForm,Comment,RemarkDialog}
};
</script>
<style lang='stylus' scoped>
.detail-operate
  width 255px
  display flex
  justify-content space-between
  align-items center
  margin-right 107px
.detail-container  
  padding 10px 107px 0;
  background-color #fff

</style>