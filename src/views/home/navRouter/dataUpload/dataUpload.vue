<template>
  <div class="content-item">
    <div class="current-position">
      <span class="iconfont" style="cursor:pointer">当前位置: 数据上传</span>
    </div>
    <div class="upload">
      <a-upload-dragger
        name="file"
        :multiple="false"
        @change="handleChange"
        :beforeUpload="beforeUpload"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">点击上传茶园信息</p>
        <p class="ant-upload-hint">仅支持Excel文件上传</p>
      </a-upload-dragger>
    </div>
  </div>
</template>
<script>
import { reqUploadTeaInfo } from "@/api";
import utils from "../../../../utils";
import { mapState } from "vuex";
import { message } from "ant-design-vue";

export default {
  data() {
    return {
      fileList: []
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    handleChange(info) {

      const status = info.file.status;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} 上传成功`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} 上传失败`);
      }
    },

    beforeUpload(file) {
      let { name } = file;
      let a = name.lastIndexOf(".");
      let b = name.slice(a + 1);
      if (b === "xls" || b === "xlsx" ) {
  
        this.handleExcUpload(file);
      }else{
        message.warning("请上传Excel电子表格文件");
      }
      return false;//手动上传
    },
    async handleExcUpload(file) {
      const formData = new FormData();
      formData.append("file", file);
      let { data } = await reqUploadTeaInfo(formData);
      utils.detailBackCode(data, { s: "上传成功", e: "上传失败" });
    }
  },

  beforeRouteLeave(to, from, next) {
    let userInfo = this.userInfo;
    let length = to.matched.length;
    let auth = to.matched[length - 1].meta.auth;
    if (!auth || auth.includes(userInfo.roleId)) {
      next();
    } else {
      message.warning("您暂时无权限访问该路径");
      next({ path: from.path });
    }
  }
};
</script>
<style lang='stylus' scoped>
.upload
  width 100%
  height 500px
  padding 150px 80px
  /deep/ .ant-upload-drag-container
    width 800px !important
    padding-top 30px
    padding-bottom 30px
  /deep/.antd-upload-drag, .antd-upload
    height 200px !important
</style>