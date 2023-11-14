import express from 'express';
// import WebSocket from 'ws';
import SocketIO from 'socket.io';
import http from 'http';
import { Socket } from 'dgram';

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log('hello');
// app.listen(3000, handleListen);

// http 서버와 ws 서버를 같이 만들어줌
const httpServer = http.createServer(app);
// const wss = new WebSocket.Server({ server });
const wsServe = SocketIO(httpServer)

wsServe.on("connection", (socket) => {
  console.log(socket);
  socket.on("enter_room", (roomName, done) => {
    console.log(socket.room);
    socket.join(roomName)
    // 프론트에서 콜백함수 실행
    // setTimeout(() => {
    //   done();
    // }, 10000)
  })
})

// const sockets = [];

// on 메소드는 백엔드에 연결된 정보를 받아온다
// wss.on("connection", (socket) => {
//   // close: 클라이언트가 연결 끊음
//   sockets.push(socket);
//   socket["nickname"] = 'anonymous';
//   socket.on("close", () => console.log('Disconnected from client'));
//   // send: 메시지 보냄
//   socket.send("hello!?");
//   // message: 메시지 받음
//   socket.on("message", msg => {
//     const message = JSON.parse(msg);
//     if(message.type === "new_message"){
//       sockets.forEach(aSocket => aSocket.send(`${socket.nickname} : ${message.payload}`))
//       console.log('메시지보낸거', message);
//     } else if (message.type === "nickname"){
//       socket["nickname"] = message.payload;
//       console.log('닉네임보낸거', message);
//     }
//   });
//   console.log('Connected to Browser!!!🇹🇷');
//   // 백엔드의 소켓
//   console.log(socket);
// });

httpServer.listen(3000, handleListen);