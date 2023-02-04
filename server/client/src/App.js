
import { useEffect, useState } from 'react';

import './App.css';
import ChessMain from './ChessMain';
import Navbar from './Navbar';

import { Routes, Route, Link } from "react-router-dom";
import io from "socket.io-client";
import RoomModal from './RoomModal';
import Video from './Video';

const socket = io.connect("https://chess-online1.herokuapp.com/");

function App() {
  const [roomCode, setRoomCode] = useState(null);
  const [white, setwhite] = useState(null)
  const [black, setblack] = useState(null)
  const [player1,setplayer1]= useState(null)
  const [player2,setplayer2]= useState(null)

  useEffect(() => {
    console.log(roomCode);
    if (roomCode) {

      socket.emit("joinRoom", roomCode);
    }
  }, [roomCode]);
  return (
  <div style={{backgroundColor:"#3B3643" ,width:"100vw", height:"100vh"}}>
  <Navbar/>
  <RoomModal  setRoomCode={setRoomCode} setwhite={setwhite} setblack={setblack}
   setplayer1={setplayer1} setplayer2={setplayer2}></RoomModal>
  <ChessMain roomCode={roomCode} socket={socket} white={white} black={black} />
  

  </div>
  );
}

export default App;
