'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Center,
  Image,
  Spinner,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import BarLoader from "react-spinners/BarLoader";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
const initialData = {
  "name":"",
  "image":"",
  "email": "",
  "gender":"",
  "password": "",
  "dob":"",
  "number":""
};
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState(initialData);
  const [uname,setUname]=useState("")
  const [dis, setDis] = useState(false);
  const navigate=useNavigate()
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();
  const handleData = (e)  => {
    const { name, type, value } = e.target;
    const val = type === "number" ? Number(value) : value;

    setUserData({
      ...userData,
      [name]: val,
    });
  };
  const handleName=(e)=>{
    setUname(e.target.value)
    console.log(uname)
 }
 
 const loadderFun = () => {
  setisLoading(true);
  setTimeout(() => {
    setisLoading(false);
  }, 3000);
};

useEffect(() => {
  if (
    userData.name == "" ||
    userData.email === "" ||
    userData.password === ""||
    userData.number === ""
  ) {
    setDis(true);
  } else {
    setDis(false);
  }
},[]);

const handleProceed = async () => {
  loadderFun()
  axios.post('https://clickserver.onrender.com/signup',userData)
  .then(function (response) {
    console.log(response.data)
    if(response.data==="Try login , already exist"){
      toast({
        title: `Try login , already exist`,
        status: "info",
        position:"top",
        duration: 9000,
        isClosable: true,
        
  
      })
     
    }
    else{
      toast({
        title: `User created. Please check your email for verification`,
        status: "success",
        position:"top",
        isClosable: true,
        containerStyle: {
          width: '800px',
          maxWidth: '100%',
        }
      })
      navigate("/")
    }
    
  })
  .catch(function (error) {
    console.log(error);
  });
  

  
  
 
};
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={{ base: '2xl', md: '4xl', lg: '4xl' }} textAlign={'center'}>
          Sign up
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg', lg: 'lg' }} color={'gray.600'}>
          Show Your Art
        </Text>
      </Stack>
      <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
        <Stack spacing={4}>
          <HStack direction={{ base: 'column', md: 'row', lg: 'row' }}>
            <Box>
              <FormControl isRequired>
                <FormLabel> Name</FormLabel>
                <Input name="name" value={userData.name} onChange={handleData} type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Number</FormLabel>
                <Input name="number" value={userData.number} onChange={handleData} type="number" />
              </FormControl>
            </Box>
          </HStack>
          <HStack direction={{ base: 'column', md: 'row', lg: 'row' }}>
            <Box>
              <FormControl isRequired>
                <FormLabel> Gender</FormLabel>
                <Input name="gender" value={userData.gender} onChange={handleData} type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Dob</FormLabel>
                <Input name="dob" value={userData.dob} onChange={handleData} type="date" />
              </FormControl>
            </Box>
          </HStack>
          <FormControl isRequired>
            <FormLabel>Image Url</FormLabel>
            <Input name="image" value={userData.image} onChange={handleData} type="text" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input name="email" value={userData.email} onChange={handleData} type="email" />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                value={userData.password}
                onChange={handleData}
                type={showPassword ? 'text' : 'password'}
              />
              <InputRightElement h={'full'}>
                <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              onClick={handleProceed}
              colorScheme="red"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              {isLoading ? (
                <BarLoader color="orange" size="xl" />
              ) : (
                "SIGN-UP"
              )}
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Already a user? <Link to="/">Login</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
}