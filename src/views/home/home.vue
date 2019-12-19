<template>
  <a-layout id="components-layout-demo-responsive">
    <Nav></Nav>
    <a-layout style="backgroundColor:white">
      <Header></Header>
      <a-layout-content
        class="content"
        ref="content"
        style="height:100%;border:1px solid #eee;backgroundColor:white"
      >
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
import { mapActions } from 'vuex';

let dataResource = [];

for (let i = 0; i < 20; i++) {
  dataResource.push({
    id:i,
    name: `茶园${i}号`,
    year: i,
    area: i,
    varieties: "群体种",
    longitude: 117.75888888+Math.random()*0.01,
    latitude: 27.973888888+Math.random()*0.01,
    county: "铅山县",
    town: "武夷山镇",
    village: "篁村",
    ph: 4.7+Math.random(),
    organicMatter: 27.9+Math.random(),
    quickActingN: 100+Math.random(),
    quickActingP: 50+Math.random(),
    quickActingK: 80+Math.random(),
    n: 1+Math.random(),
    p:0.5+Math.random(),
    K: 30+Math.random(),
    terrain: "丘陵",
    soilType: "水稻土",
    altitude: "440",
    remarks: `YAS${i}`
  });
}

export default {
  data(){
    return {
      dataResource
    }
  },
  created(){
    // console.log(this.dataResource)
  },
  activated() {},
  methods: {
  },
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
    color #00B57E
    background-color #fff
    &:after
      color #00B57E
</style>