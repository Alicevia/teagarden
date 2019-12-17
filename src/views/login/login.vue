<template>
  <div class="login">
    <div class="login-bg"></div>
    <div class="login-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  computed: {},

  mounted(){},

  methods: {},

  components: {},
}

</script>
<style lang='stylus' scoped>
.login
  position relative

  width 100%
  height 100%
  .login-bg
    width 100%
    height 400px
    background-image url('~@/assets/images/login-bg.png')
    background-size cover
    background-repeat no-repeat
  .login-container
    position absolute
    left 50%
    top 50%
    transform translate(-50%,-50%)
    width 600px
    height 520px  
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 14px 0px rgba(0, 0, 0, 0.2);
    box-sizing border-box
    padding 20px

    /deep/.title
      font-size 18px
      // font-family 'Arial, Helvetica, sans-serif'
      color #373D41
      .iconfont
        font-weight bold
    /deep/ .logo
      display block
      width 90px
      height 90px    
      margin 45px auto 39px 
    /deep/ .form
      margin 0 auto
      width 400px  
      text-align center
      .form-btn
        width 100%
      .method
        color #00B57E  
        cursor pointer
        margin 0 10px
       

    

</style>