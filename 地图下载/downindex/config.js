     
const config = {
    dir: "./lists",
    zoomArr: [8,9],
    url: 'https://api.map.baidu.com/customimage/tile?&x=xval&y=yval&z=zval&udt=20200604&scale=1&ak=6aVb5rCdo5hDYc5DP5a5GGBcjFgUiGGz&customid=normal',
    downloadInfo: {
        minLng: 115.334412,
        minLat: 39.770888,
        maxLng: 116.189887,
        maxLat: 40.260697,
        zoomList: null,
    }
}

config.downloadInfo.zoomList = config.zoomArr.map(zoom => {
    return {
        z: zoom,
        url: config.url
    }
})
module.exports = config
        