'use strict';
var mongoose = require('./db'),
    Schema = mongoose.Schema;

var GGSchema = new Schema({          
    x : { type: String },                    //行
    y: {type: String},                        //列
    z: {type: String},                        //层级
    img : { type: Buffer},                       //图片二进制
});

module.exports = mongoose.model('layer',GGSchema,'layer');