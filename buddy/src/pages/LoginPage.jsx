
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
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
import axios from 'axios';
import BarLoader from "react-spinners/BarLoader";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [email, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [load,setLoad]=useState(false)
  const [isLoading,setisLoading]=useState(false)
  const navigate = useNavigate();
  const toast = useToast()

  const handleName=(e)=>{
    setMail(e.target.value)
 }
 const handlePass=(e)=>{
    setPass(e.target.value)
 }

//  const loadderFun = () => {
//   setisLoading(true);
//   setTimeout(() => {
//     setisLoading(false);
//   }, 3000);
// };

 const handleClick=()=>{
  setisLoading(true)
  toast({
    title: 'Checking ! It might take some time',
    description: "",
    position:"top",
    status: 'info',
    duration: 9000,
    isClosable: true,
  })
  // loadderFun()
  axios.post(`https://clickserver.onrender.com/login`,{
    "email":email,
    "password":pass
  }).then((res)=>{
    setisLoading(false)
   console.log(res.data)
     if(res.data=="Login Failed"){
      toast({
        title: 'Log in failed ! Check your credentials',
        description: "",
        position:"top",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    else if(res.data==="Something went worng, please try again later"){
      toast({
        title: 'Something went worng, please try again later',
        description: "",
        position:"top",
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
    }
      else{
        toast({
          title: 'Signin Completed',
          description: "",
          position:"top",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        var in30Minutes = 1/48;
      Cookies.set('token', `${res.data.token}`, {
        expires: in30Minutes
    });
        localStorage.setItem("user",JSON.stringify(res.data.user))
        navigate("/home")
        window.location.reload()
       }
   })
   
}
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            and start your own journey!
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input value={email} onChange={handleName}  type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input value={pass} onChange={handlePass} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link to="/signup">
                <Text color={'blue.400'}>Create Account</Text>
                </Link>
              </Stack>
              <Button
              onClick={handleClick}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                 {isLoading ? (
                <BarLoader
                  color='orange'
                  size="xl"
                />
              ) : (
                "SIGN-IN"
              )}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}