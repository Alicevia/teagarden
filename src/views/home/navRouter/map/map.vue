<template>
  <baidu-map class="map" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" @ready="handler">
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    <!-- <Overlay
      :position="center"
      :active="active"
      @mouseover.native="active = true"
      @mouseleave.native="active = false"
    ></Overlay> -->
     <bm-marker  :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
    </bm-marker>
    <bm-info-window class="window-text"  :position="center" title="茶园名称"
      :closeOnClick='false' 
     :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
      <p v-text="infoWindow.contents"></p>
    </bm-info-window>
  </baidu-map>
</template>

<script>
import Overlay from "./overlay";
export default {
  data() {
    return {
      center: { lng: 117.75888888, lat:27.973888888},
      zoom: 3,
      active: false,
      infoWindow: {
        show: true,
        contents: '武夷山镇篁村',
        
      }
    };
  },

  computed: {},

  mounted() {},

  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.zoom = 13;
    },
    infoWindowClose (e) {
      this.infoWindow.show = false
    },
    infoWindowOpen (e) {
      this.infoWindow.show = true
    },
    clear () {
      this.infoWindow.contents = ''
    }
  },

  components: { Overlay }
};
</script>
<style lang='stylus' scoped>
.map
  width 100%
  height 100%
  /deep/ .window-text div
    border-radius 4px
</style>