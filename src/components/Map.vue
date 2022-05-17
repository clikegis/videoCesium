<template>
    <div id="Map">
        <div id="cesiumContainer">

        </div>
    </div>
</template>

<script>
let Cesium = require('cesium/Cesium');
export default {
    data() {
        return {
            viewer:null
        };
    },
    mounted(){
        this.viewer = new Cesium.Viewer('cesiumContainer');
    }
}
</script>

<style>
.Map{
    width: 100%;
    height: 100%;
}
</style>