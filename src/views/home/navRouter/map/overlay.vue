<template>
  <bm-overlay ref="customOverlay" :class="{sample: true, active}" pane="labelPane" @draw="draw">
    <div v-text="text" @click="handleClick"></div>
  </bm-overlay>
</template>

<script>
export default {
  props: ["text", "position", "active"],
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload();
      },
      deep: true
    }
  },
  methods: {
    handleClick() {
      global.alert("Well done.");
    },
    draw({ el, BMap, map }) {
      const { lng, lat } = this.position;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x - 33 + "px";
      el.style.top = pixel.y - 70 + "px";
    }
  }
};
</script>

<style lang='stylus'>
.sample
  position absolute
  width 67px
  height 75px
  background-image url('~@/assets/images/position.png')
// .sample.active
//   background rgba(0, 0, 0, 0.75)
//   color #fff
</style>