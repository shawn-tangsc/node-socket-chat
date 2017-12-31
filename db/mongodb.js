/**
 * Created by tangsicheng on 2017/12/27.
 */
/**
 * 这个特别麻烦，而且不太好封装
 */

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost"

var dbFunction = function () {
    // this.MongoConnect = function () {
    //     MongoClient.connect(url,function (err,db) {
    //         console.log("Connected successfully to server");
    //         db.close();
    //     })
    // };
    var insertDocuments = function (db, callback) {
        var collection = db.collection('user');
        collection.insertMany([
            {a:1},{a:2},{a:3}
        ],function (err, result) {
           console.log(result);
           console.log(err);
           console.log("Inserted 3 documents into the collection");
           callback(result);
        });
    }

    this.insert = function () {
        MongoClient.connect(url,function (err,client) {
            console.log("Connected successfully to server");
            /**
             * 这里要注意，mongodb3.0之后，就不能直接传db过去了
             * https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0?noredirect=1&lq=1
             * */
            var db = client.db('chat');
            insertDocuments(db,function () {
                client.close();
            })
        })
    }
    
}

// export default db;
module.exports = new dbFunction();