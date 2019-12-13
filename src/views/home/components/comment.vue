<template>
  <div class="comment">
    <h2 class="title">
      <span class="iconfont">&#xe626;</span>
      {{commentTitle}}
    </h2>
    <div
      class="demo-infinite-container"
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <a-list :dataSource="data">
        <a-list-item @click="showRemarkDialog"  slot="renderItem" slot-scope="item, index">
          <a-list-item-meta :description="item.email" >
            <a slot="title" :href="item.href">{{item.name.last}}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
          <div>Content</div>
        </a-list-item>
        <div v-if="loading && !busy" class="demo-loading-container">
          <a-spin />
        </div>
      </a-list>
    </div>
  </div>
</template>

<script>
import reqwest from "reqwest";
import * as TYPES from '@/store/mutations-types'

import infiniteScroll from "vue-infinite-scroll";
const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";
export default {
  directives: { infiniteScroll },
  props:['commentTitle'],
  data() {
    return {
      data: [],
      loading: false,
      busy: false
    };
  },
  beforeMount() {
    this.fetchData(res => {
      this.data = res.results;
    });
  },
  methods: {
        showRemarkDialog(){
      this.$store.commit(TYPES.CHANGE_REMARK_FLAG)
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
    handleInfiniteOnLoad() {
      const data = this.data;
      this.loading = true;
      if (data.length > 14) {
        this.$message.warning("Infinite List loaded all");
        this.busy = true;
        this.loading = false;
        return;
      }
      this.fetchData(res => {
        this.data = data.concat(res.results);
        this.loading = false;
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.comment
  width 100%
  margin-bottom 30px
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