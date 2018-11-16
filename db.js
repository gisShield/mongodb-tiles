'use strict';
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/png';

/**
 * ����
 */
mongoose.connect(DB_URL);

/**
  * ���ӳɹ�
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * �����쳣
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * ���ӶϿ�
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;




