/* 球上在指定位置创建视频 */

/* 在球上创建视频 */
/* 
    viewer：视图
    position：监控位置
    videoElement
    height:监控初始高度
    videoPosition：监控视频摆放位置 可选
*/
export let createVideo = (
  Cesium,
  viewer,
  position,
  videoElement,
  height,
  gltfUrl,
  videoPosition
) => {
  let longitude = position.longitude;
  let latitude = position.latitude;
  if (!videoPosition) {
    //计算监控摆放位置
    let leftLongitude = longitude - 0.0001;
    let rightLongitude = longitude + 0.0001;
    videoPosition = [
      leftLongitude,
      latitude,
      height + 15.0,
      rightLongitude,
      latitude,
      height + 15.0,
    ];
  }

  videoElement.play(); //开始播放
  viewer.showRenderLoopErrors = false;
  viewer.shouldAnimate = true;
  let entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(videoPosition),
      minimumHeights: [height, height],
      material: videoElement,
      outline: true,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth:2.0
    },
    point: {
      pixelSize: 10,
      color: new Cesium.Color(0, 255 / 255, 255 / 255, 1.0),
    },
    model: {
      uri: gltfUrl,
      maximumScale:1
    },
  });
};
