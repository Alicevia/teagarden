<template>
  <el-amap vid="amapDemo" :zoom="zoom" :plugin="plugin" :center="center" class="map">
    <template v-for="(item,index) in teaSubscribeInfo">
      <el-amap-marker
        :position="[parseFloat(item.longitude),parseFloat(item.latitude)]"
        :key="index"
        :label="{content:item.name,offset: [-60, -25]}"
        :events="events"
        :extData="item"
      ></el-amap-marker>
    </template>
  </el-amap>
</template>
<script>
import VueAMap from "vue-amap";
import { mapState, mapActions } from "vuex";
import { message } from "ant-design-vue";
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
      // center: [115, 29],
      zoom: 11,
      active: false,

      // label: {
      //   content: "武夷山镇篁村",
      //   offset: [0, 0]
      // },
      events: {
        click: (item, e) => {
          this.$router.push({
            path: "/home/detail",
            query: { id: item.target.F.extData.teaId }
          });
        }
      },
      // eventsmap: {
      //   mousewheel: (item) => {
      //     console.log(item);
      //   }
      // },
      plugin: [
        {
          pName: "ToolBar", //工具条插件
          position: "LT"
        },
        {
          pName: "Geolocation",
          showMarker: true,
          buttonPosition: "RB",
          events: {
            init: o => {
              if (this.teaSubscribeInfo.length !== 0) {
                return;
              }
              //定位成功 自动将marker和circle移到定位点
              o.getCurrentPosition((status, result) => {
                // console.log(result);
                if (result && result.position) {
                  // self.center = [result.position.lng, result.position.lat];
                  // this.longitude =result.position.lng
                  // this.latitude = result.position.lat
                  // console.log([result.position.lng,result.position.lat])
                  this.getOneselfPosition([
                    result.position.lng,
                    result.position.lat
                  ]);
                  // console.log(this.longitude)
                  // self.loaded = true;
                } else {
                  console.log(`定位失败`);
                }
              });
              // console.log(o);
            }
          }
        }
      ]
    };
  },

  computed: {
    ...mapState(["teaSubscribeInfo", "searchResult", "oneselfPosition"]),
    toNumber() {
      return num => {
        return parseInt(num);
      };
    },
    center() {
      if (this.searchResult.length !== 0) {
        this.zoom = 14;
        return this.searchResult;
      } else {
        if (this.teaSubscribeInfo.length !== 0) {
          let tea = this.teaSubscribeInfo[0];
          this.zoom = 11;
          return [parseFloat(tea.longitude), parseFloat(tea.latitude)];
        } else {
          // console.log( [this.longitude,this.latitude])
          return this.oneselfPosition;
        }
      }
    }
  },
  created() {
    this.getSubscribeTea();
  },
  mounted() {},

  methods: {
    ...mapActions(["getSubscribeTea", "getOneselfPosition"])
  },
  beforeRouteLeave(to, from, next) {
    this.$authority(to, from, next);
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