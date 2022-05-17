<template>
  <div id="app">
    <!-- 地图容器 -->
    <div id="mapContainer">
      <Map></Map>
    </div>
  </div>
</template>

<script>
import Map from './components/Map.vue'
export default {
  components: {
    Map
  },
}
</script>

<style lang="less">
.mapContainer{
  position: absolute;
  width: 100vw;
  height: 100vh;
}
</style>
