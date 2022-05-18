/*
 * @Author: chenyi
 * @Date: 2022-03-14 21:41:57
 * @LastEditors: chenyi
 * @LastEditTime: 2022-05-18 16:14:51
 * @FilePath: \物联感知融合\video-cesium\public\utils\04_loadGeoJson.js
 */

/**
 * @description:
 * @param {String} Cesium - 开发包
 * @param {String} viewer - 视图
 * @param {String} geoJSonPath - geoJSon数据路径
 * @param {Boolean} stretch - 是否需要拉伸
 * @param {String} stretchingProperty - 拉伸属性,仅在stretch为true时有效
 * @param {Number} stretchCoefficient - 拉伸系数,仅在stretch为true时有效
 * @return {Promise}
 */
export let loadGeoJson = async (
    Cesium,
    viewer,
    geoJSonPath,
    stretch,
    stretchingProperty,
    stretchCoefficient,
) => {
    if (!stretch) {
        //不需要拉伸
         let dataSource = await viewer.dataSources.add(Cesium.GeoJsonDataSource.load(geoJSonPath));
         return dataSource;
    } else {
        if(!stretchingProperty || !stretchCoefficient){
            throw new Error('拉伸系数或拉伸属性未指定!');
        }
        //使用某个拉伸属性实现三维效果
        let promise = Cesium.GeoJsonDataSource.load(geoJSonPath);
        let dataSource = await promise;
        viewer.dataSources.add(dataSource);
        const entities = dataSource.entities.values;
        
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];

            entity.polygon.extrudedHeight =
                parseFloat(entity.properties[stretchingProperty]) *
                stretchCoefficient;
        }

        return dataSource;
    }
};

/**
 * @description: 
 * @param {*} viewer - 视图
 * @param {*} geojsonDataSource - loadGeoJson返回的数据源
 * @return {*}
 */
export let destoryGeoJson = (viewer,geojsonDataSource)=>{
    if(geojsonDataSource){
        viewer.dataSources.remove(geojsonDataSource);
    }
}
