/**
 * Created by tangsicheng on 2017/12/31.
 */
var mongoose = require('../mongoose'),
    Schema  = mongoose.Schema;


var UserSchema = new Schema({
    msg : {type:String},
    to : {type:String},
    user : {type:String}
});
/**
 * mongoose 会自动创建一个Message +s的collection到mongodb里面
 */
module.exports = mongoose.model('Message',UserSchema);