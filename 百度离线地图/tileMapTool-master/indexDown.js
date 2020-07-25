var http = require("http");
//导入文件模块
var fs = require("fs");
var downResolveInfo = require('./downloadImg');
var server = http.createServer(function (req, res) {

    //控制台打印信息
    console.log("server is working");


    //结束服务器响应,注：没有res.end（），打开网页时，页面将处于一直加载的状态
    // res.end("server end.");

    //设置头信息
    res.setHeader("Content-Type", "text/html;charset='utf-8'");

    //直接在页面中打印出来的内容
    //res.write("response write content.");

    //读文件
    fs.readFile("./downIndex.html", "utf-8", function (err, data) {
        if (err) {
            console.log("index.html loading is failed :" + err);
        }
        else {
            //返回index.html页面
            res.end(data);
        }

    });

    //监听端口，注：一个程序只能监听一个端口
}).listen(8888);