
import React, { useEffect } from 'react'
import { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
} from '@chakra-ui/react';
// import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import logo from './logo.png'
import "./Navbar.css"
const Navbar = () => {

   const { colorMode, toggleColorMode } = useColorMode()
   useEffect(()=>{
      if(colorMode == "light"){
        toggleColorMode()
      }
   },[])
   
  return (
    <>
     <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} >
      <Flex h={16} alignItems={'center'}  justifyContent={'space-between'}>
        <Box h={14} w={14} ><img src={logo} alt="logo" /></Box>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing=''>
          <Text className='text'>Chess</Text>
          </Stack>
        </Flex>
        <Box h={14} w={14} ><img src={logo} alt="logo" /></Box>
      </Flex>
    </Box>
   </>
  )
}

export default Navbar