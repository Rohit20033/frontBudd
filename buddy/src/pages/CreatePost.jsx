import * as React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Checkbox,
  Link,
  Image,
  Flex,
  useToast,
  useColorMode,
  Box
} from '@chakra-ui/react';
import BarLoader from "react-spinners/BarLoader";
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreatePost = () => {
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [isLoading,setisLoading]=useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode ==="dark"
  const toast = useToast()
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);

  const handleUrl = (e) => {
    setUrl(e.target.value);
    setImageError(null); // Reset image error on input change
    setImagePreview(e.target.value); // Show image preview
  }

  const handleCaption = (e) => {
    setCaption(e.target.value);
  }

  const handleImageError = () => {
    setImageError("Invalid image URL or image failed to load.");
  }

  const handleClick = () => {
    setisLoading(true);
    axios.post(`https://clickserver.onrender.com/mypost/post`,{
      "url":url,
      "caption":caption
    },
    {
      headers: { authorization: `${Cookies.get("token")}` },
    }
    ).then((res)=>{
      setisLoading(false)
      console.log(res.data.message)
      if(res.data.message=="data has saved"){
        toast({
          title: 'Post Created',
          description: "",
          position:"top",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Error Occured',
          description: "",
          position:"top",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    })
    .catch((err) => {
      setisLoading(false);
      toast({
        title: 'Error Occured',
        description: err.message,
        position:"top",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    });
  }
 
  return (
    <Stack  minH="100vh" direction={{ base: 'column-reverse', md: 'row' }}>
      <Flex flex={1}>
        {imagePreview && !imageError ? (
          <Image alt="Cover image" objectFit="cover" src={imagePreview} onError={handleImageError} />
        ) : (
          <Box bg={isDark ?"dark": "white"} w="full" h="full" display="flex" alignItems="center" justifyContent="center">
            {imageError || "Image Preview"}
          </Box>
        )}
      </Flex>
      <Flex  p={8} flex={1} align="center" justify="center">
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Create Your Post</Heading>
          </Stack>
          <VStack
            as="form"
            spacing={8}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={isDark ? "gray.800" : "white"}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
          >
            <VStack spacing={4} w="100%">
              <FormControl id="email">
                <FormLabel>Image Url</FormLabel>
                <Input value={url} onChange={handleUrl} rounded="md" type="url" />
              </FormControl>
              <FormControl>
                <FormLabel>Caption</FormLabel>
                <Input value={caption} onChange={handleCaption} rounded="md" type="text" />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justify="space-between" w="100%">
                
              </Stack>
              <Button
              onClick={handleClick}
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500'
                }}
                rounded="md"
                w="100%"
              >
                {isLoading ? (
                <BarLoader
                  color='orange'
                  size="xl"
                />
              ) : (
                "Post"
              )}
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default CreatePost;
