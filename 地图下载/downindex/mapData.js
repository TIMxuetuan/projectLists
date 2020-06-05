/**
 * 配置地图下载相关配置
 * 地图行政区边界http://map.codezd.com/
 * 默认经纬度是郑州
 */
const dir = './tiles3';   //配置存放瓦片的目录
const zoomArr = [4,5,6]; //配置下载的级别
// 下载链接,可以直接下载带主题配置的地图瓦片 注意xval,yval,zval,在后边代码会替换
//const url = 'http://api1.map.bdimg.com/customimage/tile?&x=xval&y=yval&z=zval&udt=20190718&scale=1&ak=dpXWsgHGGzam9nnDyPPBm5lSDQWPZs92&styles=t%3Aland%7Ce%3Ag%7Cv%3Aon%7Cc%3A%23091220ff%2Ct%3Awater%7Ce%3Ag%7Cv%3Aon%7Cc%3A%23113549ff%2Ct%3Agreen%7Ce%3Ag%7Cv%3Aon%7Cc%3A%230e1b30ff%2Ct%3Abuilding%7Ce%3Ag%7Cv%3Aon%2Ct%3Abuilding%7Ce%3Ag.f%7Cc%3A%23113549%2Ct%3Abuilding%7Ce%3Ag.s%7Cc%3A%23dadadab3%2Ct%3Asubwaystation%7Ce%3Ag%7Cv%3Aon%7Cc%3A%23b15454B2%2Ct%3Aeducation%7Ce%3Ag%7Cv%3Aon%7Cc%3A%23e4f1f1ff%2Ct%3Amedical%7Ce%3Ag%7Cv%3Aon%7Cc%3A%23f0dedeff%2Ct%3Ascenicspots%7Ce%3Ag%7Cv%3Aon%7Cc%3A%23e2efe5ff%2Ct%3Ahighway%7Ce%3Ag%7Cv%3Aon%7Cw%3A4%2Ct%3Ahighway%7Ce%3Ag.f%7Cc%3A%23f7c54dff%2Ct%3Ahighway%7Ce%3Ag.s%7Cc%3A%23fed669ff%2Ct%3Ahighway%7Ce%3Al%7Cv%3Aon%2Ct%3Ahighway%7Ce%3Al.t.f%7Cc%3A%238f5a33ff%2Ct%3Ahighway%7Ce%3Al.t.s%7Cc%3A%23ffffff%2Ct%3Ahighway%7Ce%3Al.i%7Cv%3Aon%2Ct%3Aarterial%7Ce%3Ag%7Cv%3Aon%7Cw%3A2%2Ct%3Aarterial%7Ce%3Ag.f%7Cc%3A%23d8d8d8ff%2Ct%3Aarterial%7Ce%3Ag.s%7Cc%3A%23ffeebbff%2Ct%3Aarterial%7Ce%3Al%7Cv%3Aon%2Ct%3Aarterial%7Ce%3Al.t.f%7Cc%3A%23525355ff%2Ct%3Aarterial%7Ce%3Al.t.s%7Cc%3A%23ffffffff%2Ct%3Alocal%7Ce%3Ag%7Cv%3Aon%7Cw%3A1%2Ct%3Alocal%7Ce%3Ag.f%7Cc%3A%23d8d8d8ff%2Ct%3Alocal%7Ce%3Ag.s%7Cc%3A%23ffffffff%2Ct%3Alocal%7Ce%3Al%7Cv%3Aon%2Ct%3Alocal%7Ce%3Al.t.f%7Cc%3A%23979c9aff%2Ct%3Alocal%7Ce%3Al.t.s%7Cc%3A%23ffffffff%2Ct%3Arailway%7Ce%3Ag%7Cv%3Aon%7Cw%3A1%2Ct%3Arailway%7Ce%3Ag.f%7Cc%3A%23123c52ff%2Ct%3Arailway%7Ce%3Ag.s%7Cc%3A%2312223dff%2Ct%3Asubway%7Ce%3Ag%7Cv%3Aon%7Cw%3A1%2Ct%3Asubway%7Ce%3Ag.f%7Cc%3A%23d8d8d8ff%2Ct%3Asubway%7Ce%3Ag.s%7Cc%3A%23ffffff00%2Ct%3Asubway%7Ce%3Al%7Cv%3Aon%2Ct%3Asubway%7Ce%3Al.t.f%7Cc%3A%23979c9aff%2Ct%3Asubway%7Ce%3Al.t.s%7Cc%3A%23ffffffff%2Ct%3Acontinent%7Ce%3Al%7Cv%3Aon%2Ct%3Acontinent%7Ce%3Al.i%7Cv%3Aon%2Ct%3Acontinent%7Ce%3Al.t.f%7Cc%3A%23333333ff%2Ct%3Acontinent%7Ce%3Al.t.s%7Cc%3A%23ffffffff%2Ct%3Acity%7Ce%3Al.i%7Cv%3Aon%2Ct%3Acity%7Ce%3Al%7Cv%3Aon%2Ct%3Acity%7Ce%3Al.t.f%7Cc%3A%23454d50ff%2Ct%3Acity%7Ce%3Al.t.s%7Cc%3A%23ffffffff%2Ct%3Atown%7Ce%3Al.i%7Cv%3Aon%2Ct%3Atown%7Ce%3Al%7Cv%3Aon%2Ct%3Atown%7Ce%3Al.t.f%7Cc%3A%23454d50ff%2Ct%3Atown%7Ce%3Al.t.s%7Cc%3A%23ffffffff%2Ct%3Aroad%7Ce%3Ag.f%7Cc%3A%2312223dff%2Ct%3Apoi%7Ce%3Al%7Cv%3Aon%2Ct%3Alabel%7Ce%3Al%7Cv%3Aoff%2Ct%3Aroad%7Ce%3Ag%7Cv%3Aon%2Ct%3Aroad%7Ce%3Al%7Cv%3Aoff%2Ct%3Aroad%7Ce%3Ag.s%7Cc%3A%23ffffff00%2Ct%3Adistrict%7Ce%3Al%7Cv%3Aoff%2Ct%3Apoi%7Ce%3Al.i%7Cv%3Aoff%2Ct%3Apoi%7Ce%3Al.t.f%7Cc%3A%232dc4bbff%2Ct%3Apoi%7Ce%3Al.t.s%7Cc%3A%23ffffff00%2Ct%3Amanmade%7Ce%3Ag%7Cc%3A%2312223dff%2Ct%3Alabel%7Ce%3Al.t.s%7Cc%3A%23ffffffff%2Ct%3Aentertainment%7Ce%3Ag%7Cc%3A%23ffffffff%2Ct%3Ashopping%7Ce%3Ag%7Cc%3A%2312223dff'
const url = 'http://api1.map.bdimg.com/customimage/tile?&x=xval&y=yval&z=zval&udt=20200528&scale=1&ak=17b7Lhnf06x0CMZLI3aYn5ZIdMxfGcyc&customid=dark'
const downloadInfo = {
    // 郑州  注意：最大经纬度和左上角右下角经纬度的区别
    // minLng:112.72691853341163, 
    // minLat:34.27163002416145,  
    // maxLng:114.24322661390046, 
    // maxLat:34.98318090507226,  
    // 中国
    minLng:69.70503,
    minLat:12.661264,
    maxLng:147.120855,
    maxLat:36.350851,
    zoomList:zoomArr.map(zoom => {
        return {
            z:zoom,
            url:url
        }
    })
};

module.exports = {
    dir: dir,
    downloadInfo: downloadInfo
}