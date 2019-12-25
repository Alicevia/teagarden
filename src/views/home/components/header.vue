<template>
  <a-layout-header class="header">
    <a-input v-show="$route.path==='/home/map'" @pressEnter='searchFarm' v-model="search"  class="search-farmland" placeholder="请输入农田名称" size="large">
      <a-icon slot="prefix" type="search" />
    </a-input>
    <div class="user-center">
      <router-link to="/home/account" tag="div" class="account">
        <span class="iconfont">&#xe643;</span>
        <span>账户</span>
      </router-link>
      <div class="logout" @click="logout">
        <span class="iconfont">&#xe608;</span>
        <span>退出</span>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { message } from 'ant-design-vue';
import * as TYPES from '@/store/mutations-types'
export default {
  data() {
    return {
      search:''
    };
  },

  computed: {
    ...mapState(['teaSubscribeInfo'])
  },

  mounted() {},

  methods: {
    ...mapActions(['getUserLogout']),
    searchFarm(e) {
      let value = e.target.value
      let list = this.teaSubscribeInfo
      let searchResult = list.find(item=>{
        return item.name.includes(value)
      })
      if (!searchResult) {
        message.warning('搜索结果为空')
        this.$store.commit(TYPES.SEARCH_RESULT_POSITION,[])
      }else{
        this.$store.commit(TYPES.SEARCH_RESULT_POSITION,[parseFloat(searchResult.longitude),parseFloat(searchResult.latitude)])
        console.log(searchResult);
      }

    },
    logout(){
      this.getUserLogout().then(()=>{
        // console.log(location)
        location.href=location.origin+location.pathname
        // this.$router.push({path:'/login'})
      })
    }
  },
  watch:{
    search(value){
      if (value.trim()==='') {
        this.$store.commit(TYPES.SEARCH_RESULT_POSITION,[])
      }
    }
  },

  components: {}
};
</script>
<style lang='stylus' scoped>
.header
  position fixed
  width 100%
  padding 0px
  height 90px
  line-height 90px
  background-color #fff
  z-index 999
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
    position fixed
    right 34px
    top 20px
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