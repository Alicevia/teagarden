<template>
  <el-amap vid="amapDemo" :zoom="zoom" :plugin="plugin" :center="center" class="map">
    <template v-for="(item,index) in tea">
      <el-amap-marker  :position="item.position" :key="item.position[0]" :label='item.label'
       :events='item.events' :extData='item.extData'
      ></el-amap-marker>
    
    </template>
  </el-amap>
</template>

<script>
import VueAMap from "vue-amap";

export default {
  data() {
    return {
      tea: [
        {
          position: [117.75888888, 27.973888888],
          label: {
            content: "武夷山篁村1",
            offset: [-20,-20]
          },
          extData:{kk:'232'},
          events: {
            click: (item, e) => {
              this.$router.push({ path: "/home/detail" });
              console.log(item, e);
            }
          }
        },
        {
          position: [117.7566666, 27.970277777777],
          label: {
            content: "武夷山篁村",
            offset: [-20,-20]
          },
          extData:{kk:'232'},

          events: {
            click: (item, e) => {
              this.$router.push({ path: "/home/detail" });
              console.log(item, e);
            }
          }
        },
        {
          position: [117.81722, 27.9508333],
          label: {
            content: "武夷山乌石村",
            offset: [-20,-20]
          },
          extData:{kk:'232'},

          events: {
            click: (item, e) => {
              this.$router.push({ path: "/home/detail" });
              console.log(item, e);
            }
          }
        },
        {
          position: [117.81583333, 27.9547222222],
          label: {
            content: "武夷山乌石村",
             offset: [-20,-20]
          },
          extData:{kk:'232'},

          events: {
            click: (item, e) => {

              this.$router.push({ path: "/home/detail" });
              console.log(item, e);
            }
          }
        }
      ],
      center: [117.75888888, 27.973888888],
      zoom: 11,
      active: false,
      label: {
        content: "武夷山镇篁村",
        offset: [-20, 40]
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

  computed: {},

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