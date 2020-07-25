# tileMapTool
百度地图瓦片图下载，可以下载自定义地图
在mapData.js输入要下载的经纬度的范围和缩放等级，zoomList里的url不填时下载的是默认样式的街道图，要对不同等级应用不同的样式，先写好在线地图后浏览器F12
打开看一下对应的url,将url中的‘x=9&y=4&z=5’处改为‘x=xval&y=yval&z=zval’。
可以自行扩展写个客户端，从百度地图画框直接获取经纬度，或者研究下百度地图自定义样式地图参数的拼接格式，统一从客户端填写参数解析。
运行downloadImg.js下载瓦片图。默认下载至目录下的img文件夹。

## 2020/5/28

- 获取地图行政区边界经纬度 http://map.codezd.com/
- 下载的图片改成默认png的，可以在downloadImg.js文件中修改

## 运行

- npm i
- npm run download
