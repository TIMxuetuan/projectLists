var fs = require('fs');
var path = require('path');
var request = require('request');
var lngLatToTile = require('./mapTool')
import { dir, downloadInfo } from './mapData';
// import  lngLatToTile from './mapTool'
// import fs from 'fs';
// import path from 'path';
// import request from 'request';
// import mapData from './mapData';

class DownloadMap {
    constructor() {
        super();
        this.dir = dir;
        this.level = [];
        this.count = 0;
        this.total = 0;
        this.finished = 0;
    }

    init() {
        this.getLevel(downloadInfo);
        this.getTotal();

        this.download();
    }

    getTotal() {
        let level = [];
        for (let i = 0; i < level.length; i++) {
            this.total += ((level[i].xmax - level[i].xmin) + 1) * ((level[i].ymax - level[i].ymin) + 1);
        }

        this.level = level;
    }

    getMapImg(url, z, x, y) {
        let dir = this.dir;
        request.head(url, function (err, res, body) {
            if (err) {
                console.log('error1:' + err);
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
                if (!err && res.statusCode == 200) {
                    // 在这里可以修改下载图片格式
                    fs.writeFile(filePath1 + "/" + `${y}.png`, body, 'binary', function (err) {
                        finished++;
                        console.log(`下载：${finished}/${total}`);
                        if (err) { console.log(err); }
                    });
                }
            });
        });
    }

    async download() {
        let level = this.level;
        for (let i = 0; i < level.length; i++) {
            for (let x = level[i].xmin; x <= level[i].xmax; x++) {
                for (let y = level[i].ymin; y <= level[i].ymax; y++) {
                    count++;
                    let url = '';
                    let z = level[i].z;
                    if (level[i].url) {
                        url = level[i].url.replace(/xval/g, x);
                        url = url.replace(/yval/g, y);
                        url = url.replace(/zval/g, z);
                    } else {
                        url = 'http://online3.map.bdimg.com/tile/?qt=tile&x=xval&y=yval&z=zval&styles=pl&scaler=1&udt=20180810'.replace(/xval/g, x);
                        url = url.replace(/yval/g, y);
                        url = url.replace(/zval/g, z);
                    }
                    if (count % 100 == 0) {
                        await sleep(1000);
                    }
                    this.getMapImg(url, z, x, y);
                }
            }
        }
    }

    getLevel(info) {
        let mLeftBottomTile = '';
        let mRightTopTile = '';
        for (let i = 0; i < info.zoomList.length; i++) {
            mLeftBottomTile = lngLatToTile(info.minLng, info.minLat, info.zoomList[i].z);
            mRightTopTile = lngLatToTile(info.maxLng, info.maxLat, info.zoomList[i].z);
            level.push({
                z: info.zoomList[i].z,
                xmin: mLeftBottomTile.x,
                ymin: mLeftBottomTile.y,
                xmax: mRightTopTile.x,
                ymax: mRightTopTile.y,
                url: info.zoomList[i].url,
            })
        }
    }

    sleep() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time)
        });
    }
}

export default DownloadMap;