<template>
  <div>
    <a-modal title="Basic Modal" v-model="visible" @ok="handleOk">
      <a-form id="components-form-demo-normal-login" 
      layout='horizontal'
      :form="form" class="login-form">
        <a-form-item label="新密码">
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="再次输入">
          <a-input
            v-decorator="[
          'password2',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      form: this.$form.createForm(this, { name: "pw" })
    };
  },
  methods: {
    showModal() {
      this.visible = !this.visible;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    }
  }
};
</script>
<style lang='stylus' scoped>
#components-form-demo-normal-login .login-form
  max-width 300px
#components-form-demo-normal-login .login-form-forgot
  float right
#components-form-demo-normal-login .login-form-button
  width 100%
</style>