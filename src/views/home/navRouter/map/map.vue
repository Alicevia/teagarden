<template>
  <el-amap vid="amapDemo" :zoom="zoom" :plugin="plugin" :center="center" class="map">
    <template v-for="(item,index) in teaInfo">
      <el-amap-marker
        :position="[item.longitude,item.latitude]"
        :key="item.id"
        :label="{content:item.name,offset: [-20, -20]}"
        :events="events"
        :extData="item"
      ></el-amap-marker>
    </template>
  </el-amap>
</template>

<script>
import VueAMap from "vue-amap";
import { mapState } from 'vuex';
VueAMap.initAMapApiLoader({
  key: "23a9ece5a475725cf1a4b1cda321e6ce",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geolocation"
  ],
  v: "1.4.4"
});
export default {
  data() {
    return {
      center: [117.75888888, 27.973888888],
      zoom: 11,
      active: false,
      label: {
        content: "武夷山镇篁村",
        offset: [-20, -20]
      },
      events: {
        click: (item, e) => {
          this.$router.push({ path: "/home/detail",query:item.target.F.extData });
          console.log(item, e);
        }
      },
      plugin: [
        {
          pName: "ToolBar", //工具条插件
          position: "LT"
        }
        // {
        //   pName: "Geolocation",
        //   showMarker: true,
        //   buttonPosition: "RB",
        //   events: {
        //     init(o) {
        //       //定位成功 自动将marker和circle移到定位点
        //       o.getCurrentPosition((status, result) => {
        //         console.log(result);
        //         if (result && result.position) {
        //           self.center = [result.position.lng, result.position.lat];
        //           self.loaded = true;
        //         } else {
        //           console.log(`定位失败`);
        //         }
        //       });
        //       console.log(o);
        //     }
        //   }
        // }
      ]
    };
  },

  computed: {
    ...mapState(['teaInfo'])
  },

  mounted() {},

  methods: {
    teaArea(item) {
      console.log(item);
    }
  },

  components: {}
};
</script>
<style lang='stylus' scoped>
.map
  width 100%
  height 100%
  /deep/ .window-text div
    border-radius 4px
</style>