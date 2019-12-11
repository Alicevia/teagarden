<template>
  <baidu-map class="map" :scroll-wheel-zoom="true"
   :center="center" :zoom="zoom" @ready="handler">
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    <Overlay  :position="{lng: 118.78, lat: 32.07}"
      text=""
      :active="active"
      @mouseover.native="active = true"
      @mouseleave.native="active = false">
    
  </Overlay>
  </baidu-map>

</template>

<script>
import Overlay from './overlay'
export default {
  data () {
    return {
      center: {lng: 118.78, lat: 32.07},
      zoom: 3,
      active:false
    };
  },

  computed: {},

  mounted(){},

  methods: {
      handler ({BMap, map}) {
      console.log(BMap, map)
      this.zoom = 13
    }
  },

  components: {Overlay},
}

</script>
<style lang='stylus' scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>