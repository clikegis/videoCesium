<template>
  <div id="Map">
    <div id="cesiumContainer"></div>
    <!-- 根据数据动态创建video标签 -->
    <video
      :src="video.src"
      muted
      autoplay
      loop
      crossorigin
      controls
      v-for="video in videos"
      :key="video.id"
      :class="'video' + video.id"
      height="0"
    ></video>
  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import { createVideo } from "../../public/utils/createVideo.js";
import { loadGeoJson } from "../../public/utils/04_loadGeoJson.js";
export default {
  data() {
    return {
      viewer: null,
      videos: [
        //存储所有的videos信息
        {
          id: 1,
          src: "/videos/test.mp4",
          longitude: 114.614, //监控经度
          latitude: 30.46, //监控纬度
          gltfUrl: "/model/gltf/camera.gltf",
        },
        {
          id: 2,
          src: "/videos/test.mp4",
          longitude: 114.613, //监控经度
          latitude: 30.4622, //监控纬度
          gltfUrl: "/model/gltf/camera.gltf",
        },
        {
          id: 3,
          src: "/videos/test.mp4",
          longitude: 114.612, //监控经度
          latitude: 30.4618, //监控纬度
          gltfUrl: "/model/gltf/camera.gltf",
        },
      ],
    };
  },
  methods: {
    async load3DModel() {
      //加载未来城3D数据
      let dataSource = await loadGeoJson(
        Cesium,
        this.viewer,
        "/model/geoJson/cugBuildings.json",
        true,
        "floor",
        5
      );
      const entities = dataSource.entities.values;
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        let color = new Cesium.Color(1.0, 1.0, 1.0, 0.5);
        entity.polygon.material = color;
        entity.polygon.outline = false;
      }
    },
  },
  mounted() {
    this.viewer = new Cesium.Viewer("cesiumContainer", {
      animation: true,
      shouldAnimate: true,
    });

    //加入未来城数据
    this.load3DModel();

    //加入视频
    for (let i = 0; i < this.videos.length; i++) {
      let videoElement = document.querySelector(".video" + this.videos[i].id);
      createVideo(
        Cesium,
        this.viewer,
        {
          longitude: this.videos[i].longitude,
          latitude: this.videos[i].latitude,
        },
        videoElement,
        5,
        this.videos[i].gltfUrl
      );
    }
    /* 转换视角 */
    let options = {
      destination: Cesium.Cartesian3.fromDegrees(114.61395, 30.4622, 500.0),
      orientation: {
        heading: Cesium.Math.toRadians(200), // 水平偏角，默认正北 0
        pitch: Cesium.Math.toRadians(-60), // 俯视角，默认-90，垂直向下
        roll: 0, // 旋转角
      },
    };
    this.viewer.camera.flyTo(options);
  },
};
</script>

<style>
.Map {
  width: 100%;
  height: 100%;
}
</style>