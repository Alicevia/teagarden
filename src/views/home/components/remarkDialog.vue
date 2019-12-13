<template>
  <div class="remark-dialog">
    <a-modal :footer='null'
    title="Basic Modal" style="textAlign:center" v-model="visible" @ok="handleOk" :width="800" :centered="true">
      <a-form :form="form">
        <a-form-item label="标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
          <a-input
            v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
        <a-form-item label="内容" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
          <a-textarea
            :rows="15"
            value="每当迈入浩如烟海的图书馆时，眼前的“书山”不由让我们震惊：在这贯穿古今、兼容中西的著作中，我们该怎样阅读？阅读什么？是深阅读还是浅阅读？在我们眼中，这些都不重要，我觉得最重要的，就是用心阅读，用心体会！
          　　用心阅读，我们能体验中华五千年的香韵，能品味唐诗宋词元曲明清小说的清幽和旷达，能体验李太白那“安能摧眉折腰事权贵，使我不得开心颜”的豪迈，体验文天祥“人生自古谁无死，留取丹心照汗青”的凛然正气，更能体验李清照那“凄凄惨惨戚戚”的忧愁与悲愤。
          　　阅读，每个人都有自己的方法，有的人读死书，有的人死读书，有的人品其文化内涵，有的人知其“大意”，有的人浅阅读，有的人深阅读，然而不管怎样阅读，我们只要用心，便能品出其文墨芳香。
          　　五柳先生的阅读方法也许值得我们借鉴，在这个竞争激烈、快节奏的社会中，我们已经没有太多的时间去阅读，不求甚解已成为大多数人的步调。但是，他也没有完全地用放任自流的方法去面对阅读，在阅读过程中“每有会意，便欣然望食”。无论怎样，我们要有用心去面对的信心。
          　　用心去体验，用心去品味，我们能体验五彩的人生，能品味绚丽的生活。许多饱学之士、英雄豪杰都受书的影响，他们有的潇洒大方，有的气宇轩昂，精神饱满，在无数人的脸上，洋溢出的更多的是阅读带给他们的自信。国学大师季羡林饱读诗书，成为享誉文坛、兼容百家的一代大师，他用心体验了世界，用心品味了古今，这使他成为光耀文坛的一颗巨星。
          　　在当今世界，有很多文坛巨匠和仁人志士，他们用阅读看遍世界，用阅读了解古今。阅读，也成了我们认识世界、了解社会的工具和窗口。
          　　每个人都有自己特别的阅读方式，就像五柳先生不求甚解那样，但无论怎样，要用心去体验，用心去品味，要用心去寻求书中的真理。
          　　用心去阅读，博览群书；用心去阅读，潇洒走世界。只要我们用心去品味，用心去体验，那么整个世界都将在我们的眼中！"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import * as TYPES from '@/store/mutations-types'
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "remarkDialog" })
    };
  },
  computed:{
    ...mapState(['remarkFlag']),
    visible:{
      get(){
        return this.remarkFlag
      },
      set(){
        this.$store.commit(TYPES.CHANGE_REMARK_FLAG)
      }
    }
  },
  methods: {
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
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
<style lang='stylus' scoped>
</style>
