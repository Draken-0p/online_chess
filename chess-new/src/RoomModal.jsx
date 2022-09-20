import { Button, Modal, ModalCloseButton,ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel, Input, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react';


const RoomModal = ({setRoomCode , setwhite , setblack,setplayer1,setplayer2}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [roomCodeInput, setRoomCodeInput] = useState(null);
  const [whiteInput, setwhiteInput] = useState(null)
  const [blackInput, setblackInput] = useState(null)
  const [open ,setopen] = useState(null)

  const handleSave = () => {

    console.log(roomCodeInput)
    setRoomCode(roomCodeInput);
    setwhite(whiteInput)
  
    onClose()
    
  };
  const handleSaveb = () => {

    console.log(roomCodeInput)
    setRoomCode(roomCodeInput);
    setblack(blackInput)
    setplayer2(blackInput)
    onClose()
 
  };
  useEffect(()=>{
    if(open) return;
    setopen("open")
    onOpen()
      return
  },[open])


  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
        <ModalOverlay  backdropFilter='blur(20px)' />
        <ModalContent>
          <ModalHeader></ModalHeader>

          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Create Room</Tab>
              <Tab>Join Room</Tab>
            </TabList>



            <TabPanels>
              <TabPanel>
              <FormControl>
              <FormLabel>Create Room</FormLabel>
              <Input mt={4} mb={4}
              variant='flushed'
                placeholder="name"
                onChange={(e) => setwhiteInput(e.target.value)}
              />
              <Input
              variant='flushed'
                placeholder="code"
                onChange={(e) => setRoomCodeInput(e.target.value)}
              />
            </FormControl>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSave}>
                Create
              </Button>
            </ModalFooter>
              </TabPanel>
              <TabPanel>
              <FormControl>
              <FormLabel>Join Room</FormLabel>
              <Input  mt={4} mb={4}
              variant='flushed'
                placeholder="name2" 
                onChange={(e) => setblackInput(e.target.value)}
              />
              <Input
              variant='flushed'
                placeholder="code"
                onChange={(e) => setRoomCodeInput(e.target.value)}
              />
              <ModalFooter>
              <Button colorScheme="blue" onClick={handleSaveb}>
                Join
              </Button>
            </ModalFooter>
            </FormControl>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <ModalCloseButton />
          {/* <ModalBody>
            <FormControl>
              <FormLabel>Create Room</FormLabel>
              <Input
                placeholder="name"
                onChange={(e) => setwhiteInput(e.target.value)}
              />
              <Input
                placeholder="code"
                onChange={(e) => setRoomCodeInput(e.target.value)}
              />
            </FormControl>

            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSave}>
                Create
              </Button>
            </ModalFooter>

            <FormControl>
              <FormLabel>Join Room</FormLabel>
              <Input
                placeholder="name2"
                onChange={(e) => setblackInput(e.target.value)}
              />
              <Input
                placeholder="code"
                onChange={(e) => setRoomCodeInput(e.target.value)}
              />
            </FormControl>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSaveb}>
                Join
              </Button>
            </ModalFooter>
          </ModalBody> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default RoomModal