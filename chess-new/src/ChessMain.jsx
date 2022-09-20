import React, { useEffect, useRef, useState } from 'react'
import { Chess } from 'chess.js'
import Chessboard from 'chessboardjsx'
import { Button, Flex } from '@chakra-ui/react'
import Video from './Video'
import { Spinner } from '@chakra-ui/react'

const ChessMain = ({roomCode, socket , black ,white}) => {
    const [Fen , setFen] = useState('start')
    const [reset,setreset] = useState(false)
    const [startvideo,setstartvideo] = useState(false)
  
    let game =  useRef(null)



    useEffect(() =>{
        game.current = new Chess();
      
     
        socket.on("game-reset",(data)=>{
          game.current.clear();
          game.current.reset();
          setFen("start")
        })
            return ()=> socket.off("game-reset")
     }, [])

     useEffect(() =>{ 
      socket.on('updateGame', (data)=>{
          console.log("useeffect" , data)
   
              game.current = new Chess(data.Fen)
          console.log("ue game", game.current)
          setFen(data.Fen)        
          
      },)
      return () => socket.off("updateGame");
   }, [])
   
        const startcall = ()=>{
          setstartvideo(true)
        }

 

     const onDrop = ({sourceSquare , targetSquare}) =>{

        let move = game.current.move({
          from : sourceSquare,
          to : targetSquare
        })
          console.log("move" ,move)
        if( move === null ) return;
        if(move.color == 'b' && black) {
          setFen(game.current.fen());

          var Details = {  
            Fen : game.current.fen(),  
            roomCode : roomCode, 
          }; 
  
          socket.emit("play", Details);
        };


        if(move.color == 'w' && white) {

         setFen(game.current.fen());

         var Details = {  
           Fen : game.current.fen(),  
           roomCode : roomCode, 
         }; 

         socket.emit("play", Details);
        }
       }
       
      const resetgame =()=>{
        console.log("reset")
        var r = {
          Fen : "start",  
          roomCode : roomCode, 
        }
        socket.emit("gameover",r)

      }


  return (
      <>
      <Flex style={{ justifyContent:"center", alignItems:"center", 
      }} mt={8}>
        {
          
          game.current && game.current.game_over() ? <span onClick={resetgame}>reset</span>:<span></span>
        }
        <div style={{backgroundColor:"#474350" ,width:"41rem",height:"40rem", borderRadius:"0.3rem", color:"#B58863",
        display:"flex",justifyContent:"center", alignItems:"center", boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
          <div>
 
          {black ? (  <Chessboard position={Fen} onDrop={onDrop} orientation='black' />) :
         (  <Chessboard position={Fen} onDrop={onDrop} />)}
     
         </div>
         </div>

             <Video socket={socket} black={black} white={white} roomCode={roomCode}/> 

        

        
      </Flex>
      </>

  )
}

export default ChessMain