<template>
  <a-layout-header class="header">
    <a-input @pressEnter='searchFarm' class="search-farmland" placeholder="请输入农田名称" size="large">
      <a-icon slot="prefix" type="search" />
    </a-input>
    <div class="user-center">
      <div class="account">
        <span class="iconfont">&#xe643;</span>
        <span>账户</span>
      </div>
      <div class="logout">
        <span class="iconfont">&#xe608;</span>
        <span>退出</span>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {
    searchFarm(value) {
      console.log(value);
    }
  },

  components: {}
};
</script>
<style lang='stylus' scoped>
.header
  padding 0px
  height 90px
  line-height 90px
  background-color #fff
  /deep/ .search-farmland
    margin-left 15px
    width 400px
    i
      color #C2C2C2
    .ant-input
      outline none
      border none
      background-color #eee
      box-shadow none
      border-radius 5px
  .user-center
    float right
    margin-top 18px
    margin-right 35px
    width 80px
    height 50px
    display flex
    align-items center
    justify-content space-between
    div
      height 100%
      display flex
      flex-direction column
      align-items center
      justify-content space-between
      cursor pointer
    span
      line-height 1
      font-size 16px
      &.iconfont
        font-size 24px
    // .account
    //   color #00B57E
    // .logout
    //   color orange  
   

   
</style>