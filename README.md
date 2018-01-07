# 用nodejs+socket.IO搭建聊天室
---------------------------------
此项目是为了我另一个[ios项目](https://github.com/shawn-tangsc/inke-demo/blob/master/README.md)做的一个后台socket service。只是简单的实现了socket.io的使用和mongodb的使用。

## 下载：

```
git clone  https://github.com/shawn-tangsc/node-socket-chat
```
## 加载依赖:
			
到目录下执行npm加载
			
```
npm install
```			

## 启动服务器:

到项目目录下执行（保证5001端口没有被占用）

```
node bin/www
```
## 进入聊天室:
在任意浏览器输入http://localhost:5001/

## 效果
![live-page.gif](https://github.com/shawn-tangsc/inke-demo/blob/master/gif/live-page.gif)