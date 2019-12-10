<template>
  <a-layout id="components-layout-demo-responsive">
    <Nav></Nav>
    <a-layout>
      <Header></Header>
      <a-layout-content :style="{ margin: '2px 2px 0' }">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">Ant Design ©2018 Created by Ant UED</a-layout-footer>
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
#components-layout-demo-responsive
  height 100%
  .ant-menu-item-selected
    color  #00B57E
    &:after
      color #00B57E
</style>