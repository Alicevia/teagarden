<template>
  <div class="register">
    <div class="title">
      <span class="iconfont">&#xe678;</span> 注册
    </div>
    <img class="logo" src="@/assets/images/logo.png" alt />
    <a-form id="components-form-demo-normal-login" :form="form" class="form">
       <a-form-item>
        <a-input
          size="large"
          v-decorator="[
            'name',
            { 
              rules: [
                { required: true, message: '用户名不能为空' },
              ] 
            }
          ]"
          placeholder="请输入用户名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
            'phone',
            { 
              rules: [
                { required: true, message: '手机号不能为空' },
                {len:11,message: '请输入11位手机号',},
              ] 
            }
          ]"
          placeholder="请输入手机号"
        >
          <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
            'password',
            { 
              rules: [
                { required: true,message: '请输入密码'},
                {min:6,message: '密码不少于6位',},
                {validator: handlePass},
              ] 
            },
           ]"
          type="password"
          placeholder="请输入新密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
          'password2',
            { 
              rules: [
                { required: true,message: '请输入密码'},
                {min:6,message: '密码不少于6位',},
                {validator: handleConfirmPass},
              ] 
            },
        ]"
          type="password"
          placeholder="请再次输入密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit" class="form-btn" size="large">注 册</a-button>
        <div>
          <router-link to="sign" tag="span" class="method">已有账号？前往登陆</router-link>
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
      form: this.$form.createForm(this, { name: "register" })
    };
  },

  computed: {},

  mounted() {},

  methods: {
    ...mapActions(['getUserRegister']),
    handlePass(rule, value, callback) {
      this.password = value;
      if (this.password2 && this.password !== this.password2) {
        callback("两次密码输入不一致！");
      }
      callback();
    },
    handleConfirmPass(rule, value, callback) {
      this.password2 = value;
      if (this.password && this.password !== value) {
        callback("两次密码输入不一致！");
      }
      callback();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let payload = {
            password:values.password,
            phone:values.phone,
            name:values.name
          }
          console.log(payload)
          this.getUserRegister(payload)
        }
      });
    }
  },

  components: {}
};
</script>

<style lang='stylus' scoped>



</style>