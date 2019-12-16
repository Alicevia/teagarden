<template>
  <div class="content-item">
    <div class="current-position">
      <span class="iconfont" style="cursor:pointer">当前位置: 账户中心</span>
    </div>
    <div class="account">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="头像">
          <a-avatar
            style="marginLeft:35%;width:60px;height:60px"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="身份">
          <a-input v-decorator="[
            'identity']" />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="密码">
          <a-input  v-decorator="[
          'password',
        ]" type="password" />
        <span class="password" @click="modiPassword">修改密码</span>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="手机号">
          <a-input />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="地址">
          <a-input />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="公司">
          <a-input />
        </a-form-item>

        <a-form-item v-bind="tailFormItemLayout">
          <a-button style="width:100%"  type="primary">保存</a-button>
        </a-form-item>
      </a-form>
    </div>
  <ChangePassword ref="pw"></ChangePassword>
  </div>
</template>

<script>
import ChangePassword from 'home/components/changePassword'
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          sm: { span: 8 }
        },
        wrapperCol: {
          sm: { span: 8 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          sm: {
            span: 8,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "account" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map(
          domain => `${value}${domain}`
        );
      }
      this.autoCompleteResult = autoCompleteResult;
    },
    modiPassword(){
      this.$refs['pw'].showModal()
    }
  },
  components:{ChangePassword}
};
</script>
<style lang='stylus' scoped>
.account
  margin-top 70px
  .password
    position absolute
    width 56px
    right -70px
    cursor pointer
    color skyblue
</style>