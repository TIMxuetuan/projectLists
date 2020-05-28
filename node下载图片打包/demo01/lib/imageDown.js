var fs = require("fs");//引用fs模块
var JSZip = require("jszip"); //引用jszip模块
var image = require("imageinfo"); //引用imageinfo模块
var zip = new JSZip();
var request = require('request')
var path = require('path')
var url = require('url');


const folderPaths = './img/' //文件夹路径  有的地方需要拼接 '/'， 为了减少拼接
const dstpath = "./img"  //文件夹路径


//下载网络图片的链接
var url_data = [
    'http://pic1.win4000.com/wallpaper/4/57d7abcf2070b.jpg',
    'http://d.hiphotos.baidu.com/zhidao/pic/item/6a63f6246b600c334c3e91cb1e4c510fd9f9a16a.jpg',
    'http://img02.tooopen.com/images/20150213/tooopen_sy_80769327441.jpg'
]


//mkdirSync事件 创建新的文件夹用于保存图片  （如果有自己的文件夹，可以不使用）
function mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }

    return false
}

//下载网络图片 ，并调用打包方法
function downloadUrl(urlList) {
    // mkdirSync(dstpath)
    for (const url_item of urlList) {
        const arg = url.parse(url_item);
        const fileName = arg.pathname.split('/').slice(-1)[0];
        const download_dstpath = dstpath + '/' + fileName
        request(url_item).pipe(fs.createWriteStream(download_dstpath))
    }

    
    setTimeout(function () { packZipList() }, 1000);
}

//打包zip方法，打包成功后再删除原文件夹里的图片（减少存储）
function packZipList(){
    var lists = getFiles.getFileList(folderPaths) //获取文件夹里的所有图片文件值
    console.log("lists+", lists)
    for (var i = 0; i < lists.length; i++) {
        console.log("图片名字", lists[i].filename)
        var data = fs.readFileSync(folderPaths + lists[i].filename);
        zip.file("photo" + i + ".jpg", data, { base64: true });

        delFile(folderPaths + lists[i].filename, folderPaths) //调用删除方法
    }
    zip
        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream("out.zip"))  //打包后的包名可以自己根据需求定义，路径可以根据需求更改
        .on('finish', function () {
            console.log("out.zip written.");   //管道写完数据后，打印出提示
        });
}

downloadUrl(url_data); //调用下载图片事件


//查找指定文件夹里的所有文件
function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {
            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = itm//名字
            filesList.push(obj);
        }
    })
}
var getFiles = {
    //获取文件夹下的所有文件
    getFileList: function (path) {
        var filesList = [];
        readFileList(path, filesList);
        return filesList;
    },
    //获取文件夹下的所有图片
    getImageFiles: function (path) {
        var imageList = [];
        this.getFileList(path).forEach((item) => {
            var ms = image(fs.readFileSync(item.path + item.filename));
            ms.mimeType && (imageList.push(item.filename))
        });
        console.log("imageList+", imageList)
        return imageList;
    }
};
//获取文件夹下的所有图片
var srclist = getFiles.getImageFiles(folderPaths);
var srcNewList = [];
console.log("srclist+",srclist);
srclist.forEach(function (item, index) {
    console.log("item",item);
    if (item.split(".")[1] == 'jpg') {
        srcNewList.push({ 'imsrc': item })
    } else {
        srcNewList.push({ 'videosrc': item })
    }
})
console.log("srcNewList+",srcNewList)
// console.log("getfiles+", getFiles.getFileList(folderPaths));



//删除图片文件
function delFile(path, reservePath) {
    if (fs.existsSync(path)) {
        if (fs.statSync(path).isDirectory()) {
            let files = fs.readdirSync(path);
            files.forEach((file, index) => {
                let currentPath = path + "/" + file;
                if (fs.statSync(currentPath).isDirectory()) {
                    delFile(currentPath, reservePath);
                } else {
                    fs.unlinkSync(currentPath);
                }
            });
            if (path != reservePath) {
                fs.rmdirSync(path);
            }
        } else {
            fs.unlinkSync(path);
        }
    }
}
