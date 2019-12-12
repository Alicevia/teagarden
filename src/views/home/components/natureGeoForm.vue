<template>
  <div class="nature-geo">
    <h2 class="title">
      <span class="iconfont">&#xe626;</span>
      地理位置
    </h2>
    <!-- <a-form :form="form" style="backgroundColor:pink"> -->
      <a-row :gutter='0'  type="flex" justify="space-between" style="display:flex;justify-content:space-between" >
        <a-col v-for="(item,index) in formItemGeo" :key="index" :span="8" style="height:45px">
          <a-form-item
            :label-col="formLayout.labelCol"
            :wrapper-col="formLayout.wrapperCol"
            :label="item[1]"
            v-if="item[0]!=='flag'"
          >
            <a-input
              size="default"
              v-decorator="[
                item[0],
                {
                  rules: [
                    {
                      required: false,
                      message: 'Input something!',
                    },
                  ],
                },
              ]"
              placeholder="placeholder"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <h2 class="title" style="marginTop:10px">
        <span class="iconfont">&#xe626;</span>
        自然条件
      </h2>
      <a-row :gutter='24'  type="flex" justify="space-between" >
        <a-col v-for="(item,index) in formItemNature" :key="index" :span="8" style="height:45px">
          <a-form-item
            :label-col="formLayout.labelCol"
            :wrapper-col="formLayout.wrapperCol"
            :label="item[1]"
            v-if="item[0]!=='flag'"
          >
            <a-input
              size="default"
              v-decorator="[
                item[0],
                {
                  rules: [
                    {
                      required: false,
                      message: 'Input something!',
                    },
                  ],
                },
              ]"
              placeholder="placeholder"
            />
          </a-form-item>
        </a-col>
      </a-row>
    <!-- </a-form> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      form: this.$form.createForm(this, { name: "advanced_search" })
    };
  },

  computed: {
    formItemGeo() {
      let data = {
        name: "名称",
        year: "建园时间(年)",
        area: "茶园面积",
        varieties: "茶树品种",
        longitude: "经度",
        latitude: "纬度",
        county: "县",
        town: "乡镇",
        village: "村"
      };
      return Object.entries(data);
    },
    formItemNature() {
      let data = {
        ph: "PH",
        organicMatter: "有机质(g/kg)",
        quickActingN: "速效N(mg/kg)",
        quickActingP: "速效P(mg/kg)",
        quickActingK: "速效K(mg/kg)",
        n: "全N(g/kg)",
        p: "全P(g/kg)",
        K: "全K(g/kg)",
        terrain: "地形地貌",
        soilType: "土壤类型",
        altitude: "海拔",
        remarks: "备注"
      };
      return Object.entries(data);
    }
  },

  mounted() {},

  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log("error", error);
        console.log("Received values of form: ", values);
      });
    },

    handleReset() {
      this.form.resetFields();
    },

    toggle() {
      this.expand = !this.expand;
    }
  },

  components: {}
};
</script>
<style lang='stylus' scoped>
.nature-geo
  width 100%
  .title
    font-weight bold
    font-size 18px
    color #010101
    span
      font-size 20px
      color #00B57E
      vertical-align middle
</style>