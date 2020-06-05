var fs = require('fs');
var path = require('path');
var request = require('request');
var lngLatToTile = require('./mapTool')
// var mapData = require('./mapData');
var config = require('./config');


class DownloadMap {

    constructor() {
        this.config = config
        this.dir = this.config.dir;
        this.level = [];
        this.count = 0;
        this.total = 0;
        this.finished = 0;
    }

    init(config) {
        this.config = config
        console.log(this.config)
        this.getLevel(this.config.downloadInfo);
        this.getTotal();
        this.download();
    }

    getTotal() {
        let level = this.level;
        console.log('条数的', level)
        for (let i = 0; i < level.length; i++) {
            this.total += ((level[i].xmax - level[i].xmin) + 1) * ((level[i].ymax - level[i].ymin) + 1);
        }
    }

    getMapImg(url, z, x, y) {
        let dir = this.dir;
        let that = this
        request.head(url, function (err, res, body) {
            if (err) {
                console.log('error1:' + err);
                // alert('下载失败，请从新下载')
                console.log('下载失败')
            }
            let rootPath = path.resolve(`${dir}`);
            let filePath = path.resolve(`${dir}/${z}`);
            let filePath1 = path.resolve(`${dir}/${z}/${x}`);
            if (!fs.existsSync(rootPath)) {
                fs.mkdirSync(rootPath);
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
            }
            if (!fs.existsSync(filePath1)) {
                fs.mkdirSync(filePath1);
            }
            // request(url).on('response',function (response) {
            //     console.log(`缩放等级：${z},x：${x}，y：${y}`);
            // }).on('error',function (err) {
            //     console.log('error2:'+ err);
            // }).pipe(fs.createWriteStream(filePath1+ "/"+ `${y}.jpg`));
            request({ uri: url, encoding: 'binary' }, function (err, res, body) {
                console.log('res', res)
                if(err){
                    console.log('失败的url', url,x,y,z)
                    that.getMapImg(url, z, x, y);
                }
                if (!err && res.statusCode == 200) {
                    // 在这里可以修改下载图片格式
                    fs.writeFile(filePath1 + "/" + `${y}.png`, body, 'binary', function (err) {
                        that.finished++;
                        console.log(`下载图片：${that.finished}/${that.total}`);
                        if (that.total / that.finished == 1) {
                            console.log('成功')
                            window.vm.loading = false
                            alert('下载完成')
                        }
                        if (err) { 
                            console.log(err);
                            console.log('没有成功')
                        }
                    });
                }
            });

        });
    }

    async download() {
        let level = this.level;
        console.log('下载level', level)
        for (let i = 0; i < level.length; i++) {
            for (let x = level[i].xmin; x <= level[i].xmax; x++) {
                for (let y = level[i].ymin; y <= level[i].ymax; y++) {
                    this.count++;
                    let url = '';
                    let z = level[i].z;
                    if (level[i].url) {
                        url = level[i].url.replace(/xval/g, x);
                        url = url.replace(/yval/g, y);
                        url = url.replace(/zval/g, z);
                    } else {
                        console.log('进这里')
                        url = 'http://online3.map.bdimg.com/tile/?qt=tile&x=xval&y=yval&z=zval&styles=pl&scaler=1&udt=20180810'.replace(/xval/g, x);
                        url = url.replace(/yval/g, y);
                        url = url.replace(/zval/g, z);
                    }
                    if (this.count % 100 == 0) {
                        await this.sleep(1000);
                    }
                    console.log('下载穿的', url, z, x, y, this.count)
                    this.getMapImg(url, z, x, y);
                }
            }
        }
    }

    getLevel(info) {
        console.log('info', info)
        let mLeftBottomTile = '';
        let mRightTopTile = '';
        this.level = [];
        for (let i = 0; i < info.zoomList.length; i++) {
            mLeftBottomTile = lngLatToTile(info.minLng, info.minLat, info.zoomList[i].z);
            mRightTopTile = lngLatToTile(info.maxLng, info.maxLat, info.zoomList[i].z);
            this.level.push({
                z: info.zoomList[i].z,
                xmin: mLeftBottomTile.x,
                ymin: mLeftBottomTile.y,
                xmax: mRightTopTile.x,
                ymax: mRightTopTile.y,
                url: info.zoomList[i].url,
            })
        }
        console.log(this.level)

    }

    sleep(time) {
        return new Promise((resolve, reject) => {
            console.log('time', time)
            setTimeout(() => {
                resolve();
            }, time)
        });
    }

    bindEvents(configs) {
        console.log("this.config", this.config)
        console.log(window.vm)
        console.log('loading', window.vm.loading)
        window.vm.loading = true
        this.total = 0;
        this.finished = 0;
        this.count = 0
        this.init(configs);

    }


}



module.exports = DownloadMap;