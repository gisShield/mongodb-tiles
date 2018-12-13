'use strict';
var express = require('express');
var mylayer = require("./layer");
var app = express();

// 获取图片
app.get('/getimage/',function(req, res) {
    var x = req.query.x
	var y = req.query.y
	var z = req.query.z
	console.log(req.originalUrl)
	var whereStr = {"x":x,"y":y,"z":z};
	mylayer.findOne(whereStr,function(err, doc){
        if(err){
			console.log("Error: "+err)
		}else{
			let img = null 
			if(doc){
				if(doc.img){
					img = doc.img
				}
			}
			if(img){
				res.writeHead('200', {'Content-Type': 'image/png'});    //写http头部信息
				res.end(img,'binary'); 
			}else{
				res.status(404);
				res.end()
			}
			
		}
    })
	
})
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
