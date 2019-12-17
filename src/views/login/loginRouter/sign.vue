<template>
  <div class="sign">
    <div class="title">
      <span class="iconfont">&#xe678;</span> 登录
    </div>
    <img class="logo" src="@/assets/images/logo.png" alt />
    <a-form id="components-form-demo-normal-login" :form="form" class="form">
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
            'phone',
            { 
              rules: [
                { required: true, message: '手机号不能为空' },
                {len:11,message: '请输入手机号',},
                {pattern:new RegExp(/\d{11}/g),message:'手机号只能为11位数字'}
              ] 
            }
          ]"
          placeholder="请输入手机号"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
 <a-form-item>
        <a-input  @keyup.enter.native="handleLogin"
          size="large"
          v-decorator="[
            'password',
            { 
              rules: [
                { required: true,message: '请输入密码'},
                {min:6,message: '密码不少于6位',},
              ] 
            },
           ]"
          type="password"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleLogin"  class="form-btn" size="large">登 录</a-button>
        <div style="paddingLeft:40px">
          <a-popover
            style="width: 500px"
            title="请通知管理员"
            trigger="hover"
            :visible="hovered"
            @visibleChange="handleHoverChange"
          >
            <div slot="content">177 7888 8845</div>
            <span class="method">忘记密码?</span>
          </a-popover>|
          <router-link to="register" tag="span" class="method">注册一个新账号</router-link>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      hovered: false,
      form: this.$form.createForm(this, { name: "sign" })
    };
  },

  computed: {},

  mounted() {},

  methods: {
    ...mapActions(['getUserLogin']),
    handleHoverChange(visible) {
      this.clicked = false;
      this.hovered = visible;
    },
    handleLogin(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log( values);
          this.getUserLogin(values).then(()=>{
            this.form.resetFields()
            this.$router.replace({path:'/home'})
          }).catch(()=>{
            console.log('用户登陆失败')
          })
        }
      });
    }
  },

  components: {}
};
</script>
<style lang='stylus' scoped></style>