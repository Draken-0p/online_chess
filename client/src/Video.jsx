import { Button, Container, Flex, IconButton, Box, Input, Text, InputAddon } from '@chakra-ui/react'
import React , { useEffect, useRef, useState } from 'react'
import {PhoneIcon} from '@chakra-ui/icons'
import Peer from "simple-peer"
import "./App.css"

const Video = ({roomCode, socket , black ,white}) => {

		const [ me, setMe ] = useState("")
		const [ stream, setStream ] = useState(true)
		const [ receivingCall, setReceivingCall ] = useState(false)
		const [ caller, setCaller ] = useState("")
		const [ callerSignal, setCallerSignal ] = useState()
		const [ callAccepted, setCallAccepted ] = useState(false)
		const [ idToCall, setIdToCall ] = useState("")
		const [ callEnded, setCallEnded] = useState(false)
		const [ name, setName ] = useState("")
		const myVideo = useRef()
		const userVideo = useRef()
		const connectionRef= useRef()
	
		useEffect(() => {
			navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
				setStream(stream)
					myVideo.current.srcObject = stream
			})
	
		socket.on("me", (id) => {
				setMe(id)
			})
	
	
			socket.on("callUser", (data) => {
				setReceivingCall(true)
				setCaller(data.from)
				setName(data.name)
				setCallerSignal(data.signal)
			})
		}, [])
	
		const callUser = (id) => {
			const peer = new Peer({
				initiator: true,
				trickle: false,
				stream: stream
			})
			peer.on("signal", (data) => {
				socket.emit("callUser", {
					userToCall: id,
					signalData: data,
					from: me,
					name: name
				})
			})
			peer.on("stream", (stream) => {
				
					userVideo.current.srcObject = stream
				
			})
			socket.on("callAccepted", (signal) => {
				setCallAccepted(true)
				peer.signal(signal)
			})
	
			connectionRef.current = peer
		}
	
		const answerCall =() =>  {
			setCallAccepted(true)
			const peer = new Peer({
				initiator: false,
				trickle: false,
				stream: stream
			})
			peer.on("signal", (data) => {
				socket.emit("answerCall", { signal: data, to: caller })
			})
			peer.on("stream", (stream) => {
				userVideo.current.srcObject = stream
			})
	
			peer.signal(callerSignal)
			connectionRef.current = peer
		}
	
		const leaveCall = () => {
			setCallEnded(true)
			connectionRef.current.destroy()
		}
	
  return (
	<Container bg='blackAlpha.200' borderRadius={7} h='35rem'  w='32rem' m='0'>
	<>
	
		<div className="container">
			<div className="video-container" style={{display:"flex" ,margin:"1rem" ,gap:"1rem" , flexWrap:"wrap"}}>
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
				{/* <input
					id="filled-basic"
					label="Name"
					variant="filled"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: "20px" }}
				/> */}
			   	<Button style={{margin:"1rem"} } className={callAccepted && !callEnded ? "none":"show"}
				 onClick={() => {navigator.clipboard.writeText(me)}}>Copy to Id clipboard</Button>

				<Input variant='filled'
					id="filled-basic"
					label="ID to call"
					color='white'
					placeholder='Enter ID'
					value={idToCall}
					className={callAccepted && !callEnded ? "none":"show"}
					onChange={(e) => setIdToCall(e.target.value)
					}
				/>
				<div className="call-button" style={{margin:"1rem"}}>
					{callAccepted && !callEnded ? (
						<Button variant="contained" color="red" onClick={leaveCall}>
							End Call
						</Button>
					) : (
						<Button colorScheme='blue'aria-label="call" onClick={() => callUser(idToCall)}>
							<PhoneIcon/>Start Call
						</Button>
					)}
					{idToCall}
				</div>
			</div>
			<div style={{margin:"1rem"}}>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >someone is calling...</h1>
						<Button colorScheme='teal' variant='outline' onClick={answerCall}>
							Answer
						</Button>
					</div>
				) : null}
			</div>
		</div>
		</>

	</Container>
  )
}

export default Video