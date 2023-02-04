import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = ({setRoomCode}) => {
  const nav = useNavigate()
  const [roomCodeInput, setRoomCodeInput] = useState(null);

  const handleSave = () => {

    console.log(roomCodeInput)
    setRoomCode(roomCodeInput);
    
 
  };
  
  return (
  <>
   <div className='relative w-full h-screen bg-zinc-900/90'>
        <img className='absolute w-full h-full object-cover mix-blend-overlay' src='' alt="/" />
    

    <div className='flex justify-center items-center h-full'>
        <form className='max-w-[400px] w-full mx-auto bg-white p-8'>
            <h2 className='text-4xl font-bold text-center py-4'>Chessf</h2>
            <div className='flex flex-col mb-4'>
                <label>Enter Room code </label>
                <input className='border relative bg-gray-100 p-2' type="text" onChange={(e) => setRoomCodeInput(e.target.value)} />
            </div>

            <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white'  onClick={handleSave}>Join</button>
  
        </form>
    </div>
    </div>
  </>  
  )
}

export default Login