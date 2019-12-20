<template>
  <div class="remark-dialog">
    <a-modal
      :footer="footer"
      @cancel="showModal"
      :title="theme"
      style="textAlign:center"
      v-model="visible"
      @ok="handleOk"
      :width="700"
      :centered="true"
    >
      <a-form :form="form">
        <a-form-item label="标题" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['title', { 
              rules: [{ required: true, message: '请输入标题' }],
              initialValue:comment.title 
              }]"
          />
        </a-form-item>
        <a-form-item label="内容" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
          <a-textarea
            :rows="15"
            v-decorator="['content', { 
              initialValue:comment.content 
              }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import * as TYPES from "@/store/mutations-types";
import {reqAddRemark} from '@/api'
import utils from '../../../utils';
export default {
  props: ["theme", "footer", "comment"],

  data() {
    return {
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "remarkDialog" })
    };
  },
  computed: {
    ...mapState(["remarkFlag"])
    // visible:{
    //   get(){
    //     return this.remarkFlag
    //   },
    //   set(){
    //     this.$store.commit(TYPES.CHANGE_REMARK_FLAG)
    //   }
    // }
  },
  methods: {
    ...mapActions(['getTeaDetailInfo']),
    showModal() {
      this.visible = !this.visible;
    },

    handleOk(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          let payload = {
            ...values,
            teaGardenId:this.$route.query.id
          }
          let {data} = await reqAddRemark(payload)
          utils.detailBackCode(data,{s:'备注成功'},()=>{
            this.form.resetFields()
            this.showModal()
            this.getTeaDetailInfo({teaGardenId:this.$route.query.id})
          })
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    }
  }
};
</script>
<style lang='stylus' scoped></style>
