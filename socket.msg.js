
var sio = require('socket.io');
// var mongodb = require('./db/mongodb');
// var mongoose = require('./db/mongoose'),
//     Schema = mongoose.Schema;
var User = require('./db/model/User');
var Message = require('./db/model/Message')
var IO = function(server) {
    var io = sio.listen(server)
    var users = {},
        usocket = {};
    var counter = 0;
    var home = {};
    // var xss = require('xss');


    /**
    * socketIO 内置事件
    * http://cnodejs.org/topic/53911fd9c3ee0b5820f0b9ef
    *
    * */


    io.on('connection', function(socket) {
        console.log('a user connected.'+socket.id);
        var username = "";



        //发送消息事件
        socket.on('chat message', function(data) {
            sendmsg(data);
            // insertMessage(data);
        });

        //用户进入事件
        socket.on('user join', function(data) {
            counter++;
            users[username] = data.user;
            usocket[username] = socket;
            var commonData = {};
            commonData.type = 1;
            commonData.msg = "我们提倡绿色直播，严禁涉政、涉恐、涉群体性事件、涉黄等直播";
            usocket[username].emit('to ' + data.user, commonData);
            console.log('join:' + data.user);
            data.type = 1;
            data.users = users;
            data.counter = counter;
            data.msg = "欢迎 " + data.user + " 进入聊天室";
            sendmsg(data);
            // insertUser();
        });

        //断开连接事件
        socket.on('disconnect', function() {
            console.log('disconnect2')
            if (username) {
                counter--;
                delete users[username];
                delete usocket[username];
                sendmsg({
                    type: 1,
                    msg: "用户<b>" + username + "</b>离开聊天室",
                    counter: counter,
                    users: users
                })
            }
        });
    });

    // function homeLeave(uname) {
    //     if (home.name && home.name == uname) {
    //         home = {};
    //         io.emit('home leave', uname);
    //     }
    // }
    // //插入数据库
    // function insertData(data) {
    //     var conn = db.connect();
    //     var post = {
    //         msg: data.msg,
    //         uname: data.user,
    //         time: data.time.toString(),
    //         to: data.to
    //     };
    //     var query = conn.query('insert into chatmsg set ?', post, function(err, result) {
    //         console.log(err);
    //         console.log(result)
    //     })
    //     console.log(query.sql);
    //     conn.end();
    // }

    function sendmsg(data) {
        io.emit('chat message', data);
    }

    function sendUserMsg(data) {
        if (data.to in usocket) {
            console.log('================')
            console.log('to' + data.to, data);
            usocket[data.to].emit('to' + data.to, data);
            usocket[data.user].emit('to' + data.user, data);
            console.log('================')
        }
    }


    /**
     * mongodb 操作
     */
    // function insertInfo() {
    //     mongodb.insert();
    // }
    /**
     * mongoose 操作mongodb
     */
    function insertUser() {
        var user = new User({
           username : 'helloworld',
            userpwd: 'abcd',
            userage: 37,
            logindate: new Date()
        });
        user.save(function (err,res) {
            if(err){
                console.log('Error:'+err);
            }else{
                console.log('res:'+res);
            }
        })
    }

    /**
     * 插入message
     */
    function insertMessage(data) {
        var message = new Message({
            msg:data.msg,
            to : data.to,
            user : data.user
        })
        message.save(function (err,res) {
            if(err){
                console.log('Error:'+err);
            }else{
                console.log('res:'+res);
            }
        })
    }
}
module.exports = IO;