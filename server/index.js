const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
require("dotenv").config();

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("joinRoom", (roomCode) => {
    console.log(`A user joined the room ${roomCode}`);
 
    socket.join(roomCode);
  });


  socket.on("play", (data) => {

    var New_Details = {  
      Fen : data.Fen,  
      roomCode : data.roomCode, 
    }; 
     socket.broadcast.to(data.roomCode).emit("updateGame", New_Details);
    console.log(`play at ${data.Fen} to ${data.roomCode}`);
   
  });
  socket.on("gameover",(data)=>{
    var new_r ={
      Fen : data.Fen,  
      roomCode : data.roomCode, 
    }
    socket.broadcast.to(data.roomCode).emit("game-reset",new_r);

    console.log(`play at ${data.Fen} to ${data.roomCode}`);
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected");



  });

  socket.on('callid',(data)=>{
    let new_data = data
    console.log(new_data)
     socket.emit("calllingid",new_data)
 })

//  video

socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
  
  
  
  
  
});



if(process.env.NODE_ENV == "production"){

  app.use(express.static("client/build"))

  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}



server.listen(process.env.PORT || 5000, () =>
  console.log("server running => http://localhost:5000")
);
