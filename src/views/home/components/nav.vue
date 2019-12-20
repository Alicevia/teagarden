<template>
  <a-layout-sider
    class="nav"
    collapsedWidth="0"
    @collapse="onCollapse"
    @breakpoint="onBreakpoint"
    :width="210"
  >
    <div class="logo">
      <img class="logo-img" src="../../../assets/images/logo.png" alt />
    </div>
    <a-menu class="nav-menu" mode="inline" :defaultSelectedKeys="[$route.path]">
      <template v-for="(item) in navList">
        <a-menu-item
          :key="item.path"
          v-if="item.auth.indexOf(userInfo.roleId)!==-1"
          @click="changeRouter(item.path)"
          class="nav-menu-item"
          style="padding-left:60px"
        >
          <span class="iconfont" v-html="item.icon"></span>
          <span class="nav-text">{{item.title}}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapState } from "vuex";
// 1 超管 2管理 3专家 4用户
export default {
  data() {
    return {
      selectNav: "home",
      navList: [
        {
          path: "/home/map",
          title: "首页",
          icon: "&#xe600;",
          auth: [1, 2, 3, 4]
        },
        {
          path: "/home/tea",
          title: "茶园",
          icon: "&#xe64a;",
          auth: [1, 2, 3, 4]
        },
        { path: "/home/professor", title: "专家", icon: "&#xe607;", auth: [3] },
        {
          path: "/home/usermanage",
          title: "用户管理",
          icon: "&#xe616;",
          auth: [1, 2]
        },
        { path: "/home/admin", title: "权限管理", icon: "&#xe601;", auth: [1] },
        {
          path: "/home/data",
          title: "数据上传",
          icon: "&#xe601;",
          auth: [1, 2]
        }
      ]
    };
  },

  computed: {
    ...mapState(["userInfo"]),
    check() {
      return;
    }
  },

  mounted() {},
  activated() {},
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    changeRouter(path) {
      // console.log(this.$route)
      this.$router.push({ path });
    }
  },

  components: {}
};
</script>
<style lang='stylus' scoped>
.nav
  background-color #00B57E
  .logo
    position relative
    height 90px
    background-color #fff
    .logo-img
      position absolute
      left 50%
      top 50%
      width 60px
      height 60px
      transform translate(-50%, -50%)
  .nav-menu
    padding-top 30px
    background-color #00B57E
    color white
    .nav-menu-item
      height 50px
      line-height 50px
      &::after
        border none
        background-color #00B57E
      &:hover
        color #00B57E
        background-color #fff
      span
        font-size 18px
        &.iconfont
          padding-right 10px
</style>