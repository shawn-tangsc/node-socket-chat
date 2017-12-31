/**
 * Created by tangsicheng on 2017/12/28.
 */
/**
 * https://www.cnblogs.com/zhongweiv/p/mongoose.html
 */
var mongoose = require("mongoose");
var DB_URL = 'mongodb://localhost/chat'
/**
 * 连接
 */
mongoose.connect(DB_URL);
/**
 * 更多监听事件，可以查看http://mongoosejs.com/docs/api.html#connection_Connection
 */
/**
 * 连接成功
 */
mongoose.connection.on('connected',function () {
    console.log('Mongoose connection open to' + DB_URL);
})
/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error :'+err);
})
/**
 * 连接断开
 */
mongoose.connection.on('disconnected',function () {
    console.log('Mongoose connection disconnected');
})
// var Schema = mongoose.Schema;
//
// var movieSchema = new Schema({
//     doctor : String,
//     title : String,
//     language : String,
//     country : String,
//     year : Number,
//     summary : String,
//     poster : String,
//     flash : String
// })

module.exports = mongoose;