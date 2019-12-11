<template>
  <div class="sign">
    <div class="title">
      <span class="iconfont">&#xe678;</span> 登录
    </div>
    <img class="logo" src="@/assets/images/logo.png" alt />
    <a-form id="components-form-demo-normal-login" 
   
    :form="form" class="form">
      <a-form-item>
        <a-input
          size='large'
          v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名' }] },
        ]"
          placeholder="用户名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
         size='large'
          v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码' }] },
        ]"
          type="password"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit"
         class="form-btn" size='large'>登 录</a-button>
        <span class="method">忘记密码</span> |
        <span class="method">注册</span>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { message } from 'ant-design-vue';
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "normal_login" })
    };
  },

  computed: {},

  mounted() {},

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log( values);
          if(values.userName==='admin'&&values.password==='123456'){
            this.$router.replace({path:'/home'})
          }else{
            message.error('用户名或密码错误')
          }
        }
      });
    }
  },

  components: {}
};
</script>
<style lang='stylus' scoped></style>