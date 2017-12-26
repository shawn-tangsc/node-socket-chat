
var sio = require('socket.io');
var IO = function(server) {
    var io = sio.listen(server)
    var users = {},
        usocket = {};
    var counter = 0;
    var home = {};
    // var xss = require('xss');

    io.on('connection', function(socket) {
        console.log('a user connected.');
        var username = "";
        socket.broadcast.emit('hi', {})
        socket.on('chat message', function(data) {
            sendmsg(data);
        });
        socket.on('user join', function(data) {
            counter++;
            users[username] = data.user;
            usocket[username] = socket;
            console.log('join:' + data.user);
            data.type = 0;
            data.users = users;
            data.counter = counter;
            data.msg = "欢迎<b>" + data.user + "</b>进入聊天室";
            sendmsg(data);
        });
        socket.on('disconnect', function() {
            console.log('disconnect2')
            if (username) {
                counter--;
                delete users[username];
                delete usocket[username];
                if (home.name == username) {
                    homeLeave(username);
                }
                sendmsg({
                    type: 0,
                    msg: "用户<b>" + username + "</b>离开聊天室",
                    counter: counter,
                    users: users
                })
            }
        });
        socket.on("home", function(data) {
            console.log('home:' + home.name)
            var user = data.user;
            if( !users[home.name] ){
                home = {};
            }
            if (!home.name) {
                home.name = user;
                home.socket = socket;
                usocket[user].emit('sys' + user, {
                    user: user,
                    msg: "当前房主(" + home.name + ");等他退出后，你就可以申请房主了."
                });
            } else {
                usocket[user].emit('sys' + user, {
                    user: home.name,
                    msg: "当前已经有房主(" + home.name + ");等他退出后，你就可以申请房主了."
                });
            }
            console.log('home:' + home.name)
        });
        socket.on('home leave', function(uname) {
            homeLeave(uname);
        })
    });

    function homeLeave(uname) {
        if (home.name && home.name == uname) {
            home = {};
            io.emit('home leave', uname);
        }
    }
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
}
module.exports = IO;