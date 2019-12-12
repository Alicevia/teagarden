<template>
  <div class="content-item">
    <div class="current-position">
      <span @click="goBack" class="iconfont" style="cursor:pointer">当前位置: 列表/详情页</span>
      <div class="detail-operate">
         <a-button type="primary" style="borderRadius:16px;backgroundColor:#EEEEEE;color:#000000;border:none">
          <span class="iconfont" style="fontSize:14px">&#xe68d;</span>
          <span style="marginLeft:6px">备注</span>
        </a-button>
         <a-button type="primary" style="borderRadius:16px" ghost>
          <span class="iconfont" style="fontSize:14px">&#xe65b;</span>
          <span style="marginLeft:6px">提交</span>
        </a-button>
        <a-button type="primary" style="borderRadius:16px">
          <span class="iconfont" style="fontSize:14px">&#xe65b;</span>
          <span style="marginLeft:6px">订阅</span>
        </a-button>
      </div>
    </div>
    <div class="detail-container">
      <NatureGeoForm></NatureGeoForm>

    </div>
  </div>
</template>

<script>
import NatureGeoForm from 'home/components/natureGeoForm'
export default {
  props: ["detail"],
  data() {
    return {};
  },

  computed: {},

  mounted() {},
  activated() {
    console.log(this.detail);
    console.log(this.$route);
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },

  components: {NatureGeoForm}
};
</script>
<style lang='stylus' scoped>
.detail-operate
  width 255px
  display flex
  justify-content space-between
  align-items center
  margin-right 127px
.detail-container  
  padding 10px 127px 0;
</style>