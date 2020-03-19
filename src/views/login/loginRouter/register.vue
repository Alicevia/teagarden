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
                {pattern:new RegExp( /^1\d{10}$/,'g'),message:'手机号为11位数字'},
              ] 
            }
          ]"
          placeholder="请输入手机号"
        >
          <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="(trigger) => trigger.parentElement"
        v-model="state.passwordLevelChecked"
      >
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              强度：
              <span>{{ passwordLevelName }}</span>
            </div>
            <a-progress
              :percent="state.percent"
              :showInfo="false"
              :strokeColor=" passwordLevelColor "
            />
            <div style="margin-top: 10px;">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input
            size="large"
             @click="handlePasswordInputClick"
            v-decorator="[
            'password',
            { 
              rules: [
                { required: true,message: '请输入密码'},
                {validator: handlePass},
                {min:6,message: '密码不少于6位',},
              ] 
            },
           ]"
            type="password"
            placeholder="请输入新密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
      </a-popover>








      <!-- <a-form-item>
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
      </a-form-item>-->

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
import { mapActions } from "vuex";
const levelNames = {
  0: "低",
  1: "低",
  2: "中",
  3: "强"
};
const levelClass = {
  0: "error",
  1: "error",
  2: "warning",
  3: "success"
};
const levelColor = {
  0: "#ff0000",
  1: "#ff0000",
  2: "#ff7e05",
  3: "#52c41a"
};
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "register" }),
      state: {
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: "#FF0000"
      }
    };
  },

  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel];
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel];
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel];
    }
  },

  mounted() {},

  methods: {
    ...mapActions(["getUserRegister"]),
    // 处理密码强度
    handlePasswordLevel(rule, value, callback) {
      let level = 0;

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++;
      }
      this.state.passwordLevel = level;
      this.state.percent = level * 30;
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100;
        }
        callback();
      } else {
        if (level === 0) {
          this.state.percent = 10;
          // callback(new Error("密码强度不够"));

        }
      }
    },
     handlePasswordInputClick () {
  
      this.state.passwordLevelChecked = true
    },

    handlePass(rule, value, callback) {
      this.password = value;
      this.handlePasswordLevel(rule,value,callback) 
      if (value.indexOf(' ')!==-1) {
        callback('空格不能作为密码')
      }
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
            password: values.password,
            phone: values.phone,
            name: values.name
          };
          console.log(payload);
          this.getUserRegister(payload);
        }
      });
    }
  },

  components: {}
};
</script>

<style lang='stylus' scoped>
.user-register
  &.error
    color #ff0000
  &.warning
    color #ff7e05
  &.success
    color #52c41a
</style>