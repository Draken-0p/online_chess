import React, { useEffect, useRef, useState } from 'react'
import { Chess } from 'chess.js'
import Chessboard from 'chessboardjsx'
import { Button, Flex } from '@chakra-ui/react'
import Video from './Video'

const ChessMain = ({roomCode, socket , black ,white}) => {
    const [Fen , setFen] = useState('start')
 
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
          
          game.current && game.current.game_over() ? 
          <div style={{
            position: "absolute",left: "34%",
            top: "50%",
            transform: "translate(-50%,-50%)"}} >
              <h1 style={{margin:"0.5rem",color:"red" ,fontWeight:"bold",fontSize:"20px"}}>game over</h1>
              <Button colorScheme='teal' variant='solid' >
          <span onClick={resetgame}>Start Again</span>
        </Button>
          </div>
        :<span></span>
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