var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('./mime').types;
console.log("http-server start!");

var server = http.createServer(function (req,res) {
    var pathname = req.url;

    function getNowFormateDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }
    if(pathname=='/'){
        res.writeHeader(200,{'Content-Type':'text/html'});
        fs.createReadStream('../evaluate.html').pipe(res);
        console.log("visit /  at: "+getNowFormateDate());
    }else if(pathname=="/favicon.ico"){
        res.end("");
        console.log("visit favicon.ico  at: "+getNowFormateDate());
    }else if(pathname=="/robots.txt"){
        res.end("");
        console.log("visit robots.txt  at: "+getNowFormateDate());
    }else {
        var extname = path.extname(pathname);
        extname = extname ? extname.slice(1) : 'unknown';
        res.writeHeader(200,{'Content-Type':mime[extname]});
        fs.createReadStream("../"+pathname).pipe(res);
        console.log("visit"+pathname+" at: "+getNowFormateDate());
    }
});

server.listen(8090);

/**
 * 全局错误捕获,防止线程中断
 */
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});