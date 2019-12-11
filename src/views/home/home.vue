<template>
  <a-layout id="components-layout-demo-responsive">
    <Nav></Nav>
    <a-layout>
      <Header></Header>
      <a-layout-content class="content" style="border:1px solid #eee;padding:14px 15px 0px;backgroundColor:white">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Header from "./components/header";
import Nav from "./components/nav";
export default {
  methods: {},
  components: {
    Header,
    Nav
  }
};
</script>

<style lang='stylus'>
.content 
  width 100%
  height 100%
  .current-position
    height 50px
    display flex
    justify-content space-between
#components-layout-demo-responsive
  height 100%
  .ant-menu-item-selected
    color  #00B57E
    background-color #fff
    &:after
      color #00B57E
</style>