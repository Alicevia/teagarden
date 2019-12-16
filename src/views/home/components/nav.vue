<template>
  <a-layout-sider
    class="nav"
    collapsedWidth="0"
    @collapse="onCollapse"
    @breakpoint="onBreakpoint"
    :width="210"
  >
    <div class="logo">
      <img class="logo-img" src="../../../assets/images/logo.png" alt />
    </div>
    <a-menu class="nav-menu" mode="inline" :defaultSelectedKeys='[$route.path]'>
      <a-menu-item @click="changeRouter('/home/map')" key="/home/map" class="nav-menu-item" style="padding-left:60px" >
         <span class="iconfont">&#xe600;</span>
          <span class="nav-text">首页</span>
      </a-menu-item>
      <a-menu-item @click="changeRouter('/home/tea')" key="/home/tea" class="nav-menu-item" style="padding-left:60px">
        <span class="iconfont">&#xe64a;</span>
        <span class="nav-text">茶园</span>
      </a-menu-item>
      <a-menu-item @click="changeRouter('/home/professor')" key="/home/professor" class="nav-menu-item" style="padding-left:60px">
        <span class="iconfont">&#xe607;</span>
        <span class="nav-text">专家</span>
      </a-menu-item>
      <a-menu-item @click="changeRouter('/home/usermanage')" key="/home/usermanage" class="nav-menu-item" style="padding-left:60px">
        <span class="iconfont">&#xe616;</span>
        <span class="nav-text">用户管理</span>
      </a-menu-item>
      <a-menu-item @click="changeRouter('/home/admin')" key="/home/admin" class="nav-menu-item" style="padding-left:60px">
        <span class="iconfont">&#xe601;</span>
        <span class="nav-text">权限管理</span>
      </a-menu-item>
      <a-menu-item @click="changeRouter('/home/data')" key="/home/data" class="nav-menu-item" style="padding-left:60px">
        <span class="iconfont">&#xe601;</span>
        <span class="nav-text">数据上传</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  data() {
    return {
      selectNav:'home'
    };
  },

  computed: {},
  
  mounted() {
  },
  activated(){
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    changeRouter(path){
    console.log(this.$route)
      

      this.$router.push({path})
    }
  },

  components: {}
};
</script>
<style lang='stylus' scoped>
.nav
  background-color #00B57E
  .logo
    position relative
    height 90px
    background-color #fff
    .logo-img
      position absolute
      left 50%
      top 50%
      width 60px
      height 60px
      transform translate(-50%, -50%)
  .nav-menu
    padding-top 30px
    background-color #00B57E
    color white
    .nav-menu-item
      
      height 50px
      line-height 50px
      &::after
        border none 
        background-color #00B57E
      &:hover
        color #00B57E 
        background-color #fff
      span
        font-size 18px
        &.iconfont
          padding-right 10px
</style>