<template>
  <a-layout id="components-layout-demo-responsive">
    <Nav></Nav>
    <a-layout style="backgroundColor:white">
      <Header></Header>
      <a-layout-content class="content" style="height:100%;border:1px solid #eee;backgroundColor:white">
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
  activated(){

  },
  methods: {},
  components: {
    Header,
    Nav
  },
  
};
</script>

<style lang='stylus'>
.content 
  width 100%
  height 100%
  margin-top 90px
  .content-item
    padding 0 15px
  .current-position
    line-height 50px
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