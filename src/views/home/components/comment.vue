<template>
  <div class="comment">
    <h2 class="title">
      <span class="iconfont">&#xe626;</span>
      {{commentTitle}}
    </h2>
    <div
      class="demo-infinite-container"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <a-list :dataSource="comments">
        <a-list-item @click="showRemarkDialog(item)" slot="renderItem" slot-scope="item">
          <a-list-item-meta :description="item.title" class="meta-item">
            <a slot="title" class="username">{{item.userName}}</a>
            <a-avatar
              slot="avatar"
              :src="item.headPicture"
            />
          </a-list-item-meta>
          <div>{{item.remarksTime}}</div>
        </a-list-item>
        <div v-if="loading && !busy" class="demo-loading-container">
          <a-spin />
        </div>
      </a-list>
    </div>
    <RemarkDialog ref="commentCheck" :comment='comment' theme="备注查看" :footer='null'></RemarkDialog>
  </div>
</template>

<script>
import reqwest from "reqwest";
import * as TYPES from "@/store/mutations-types";
import RemarkDialog from 'home/components/remarkDialog'
import infiniteScroll from "vue-infinite-scroll";
import { message } from 'ant-design-vue';
const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";
export default {
  directives: { infiniteScroll },
  props: ["commentTitle", "comments"],
  data() {
    return {
      data: [],
      loading: false,
      busy: false,
      flag:true,

      comment:{
        title:'',
        content:''
      }
    };
  },
  beforeMount() {
    this.fetchData(res => {
      this.data = res.results;
    });
  },
  methods: {
    showRemarkDialog(item) {
      this.comment = item
      console.log(item)
      this.$refs['commentCheck'].showModal()
      // this.$store.commit(TYPES.CHANGE_REMARK_FLAG);
    },
    fetchData(callback) {
      reqwest({
        url: fakeDataUrl,
        type: "json",
        method: "get",
        contentType: "application/json",
        success: res => {
          callback(res);
        }
      });
    },

  },
  components:{RemarkDialog}
};
</script>
<style lang='stylus' scoped>
.comment
  width 100%
  margin-bottom 30px
  .ant-list-item-meta
    flex 4
    .ant-list-item-meta-description
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
      overflow hidden
  .username
    font-size 18px
  .title
    font-weight bold
    font-size 18px
    color #010101
    span
      font-size 20px
      color #00B57E
      vertical-align middle
.demo-infinite-container
  border 1px solid #e8e8e8
  // border none
  border-radius 4px
  overflow auto
  padding 8px 24px
  height 300px
  margin-top 20px
  margin-left 40px
.demo-loading-container
  position absolute
  bottom 40px
  width 100%
  text-align center
</style>