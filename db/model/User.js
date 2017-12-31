/**
 * Created by tangsicheng on 2017/12/31.
 */
var mongoose = require('../mongoose'),
    Schema  = mongoose.Schema;

var UserSchema = new Schema({
    username : {type:String}, //用户账号
    userpwd : {type:String},    //用户密码
    userage : {type:Number},    //年龄
    logindate : {type: Date}    // 最近登陆时间
});

module.exports = mongoose.model('User',UserSchema);