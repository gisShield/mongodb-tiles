'use strict';
var mongoose = require('./db'),
    Schema = mongoose.Schema;

var GGSchema = new Schema({          
    x : { type: String },                    //��
    y: {type: String},                        //��
    z: {type: String},                        //�㼶
    img : { type: Buffer},                       //ͼƬ������
});

module.exports = mongoose.model('layer',GGSchema,'layer');