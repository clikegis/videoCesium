<template>
  <div class="home">
    <div id="cesiumContainer">
      
    </div>
  </div>
</template>

<script>
let Cesium = require('cesium/Cesium');
export default {
  name: 'Home',
  mounted(){
    let viewer = new Cesium.Viewer('cesiumContainer');
  }
}
</script>
