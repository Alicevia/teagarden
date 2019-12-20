<template>
  <div class="content-item">
    <div class="current-position">
      <span class="iconfont" style="cursor:pointer">当前位置: 账户中心</span>
    </div>
    <div class="account">
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="头像">
          <a-avatar
            style="marginLeft:35%;width:60px;height:60px"
            :src="'data:image/jpg;base64,'+userInfo.headPicture"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="姓名">
          <a-input v-decorator="[
            'name',{initialValue:userInfo.name}]" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="身份">
          <a-input :value="roleId" disabled />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码">
          <a-input value="******" disabled></a-input>
          <span class="password" @click="modiPassword">修改密码</span>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="手机号">
          <a-input :value="userInfo.phone" disabled />
          <span class="password" @click="modiPhone">更换手机</span>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="地址">
          <a-input v-decorator="[
            'address',{initialValue:userInfo.address}]" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="公司">
          <a-input v-decorator="[
            'company',{initialValue:userInfo.company}]" />
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button style="width:100%" type="primary" @click="handleAccountInfo">保存</a-button>
        </a-form-item>
      </a-form>
    </div>
    <ChangePassword ref="pw"></ChangePassword>
    <ChangePhone ref="ph"></ChangePhone>
  </div>
</template>

<script>
import ChangePassword from "home/components/changePassword";
import ChangePhone from "home/components/changePhone";

import { mapActions, mapState } from "vuex";
import { reqModiUserInfo } from "@/api";
import utils from "../../../../utils";
export default {
  data() {
    return {
      headimg:'',
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
      },
      form: this.$form.createForm(this, { name: "account" })
    };
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    ...mapState(["userInfo"]),
    roleId: {
      get() {
        switch (this.userInfo.roleId || "") {
          case 1:
            return "超级管理员";
            break;
          case 2:
            return "管理员";
            break;
          case 3:
            return "专家";
            break;
          default:
            return "普通会员";
            break;
        }
      }
    },
    //  blobToBase64(){
    //    utils.blobToDataURL(this.userInfo.headPicture).then((e)=>{
    //      this.headimg = e
    //    })
    // }
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    // 修改个人信息
    handleAccountInfo(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          let { data } = await reqModiUserInfo(values);
          console.log(data);
          utils.detailBackCode(data, { s: "修改个人信息成功" }, () => {
            this.getUserInfo();
          });
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

    modiPassword() {
      this.$refs["pw"].showModal();
    },
    modiPhone() {
      this.$refs["ph"].showModal();
    }
  },
  filters:{

  },
  components: { ChangePassword, ChangePhone }
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