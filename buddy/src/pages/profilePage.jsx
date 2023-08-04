import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  HStack,
  useToast,
  SimpleGrid,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AbsoluteCenter,
  useColorMode,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import { RiCamera3Fill } from 'react-icons/ri';
import Cookies from 'js-cookie';
import { BiSad } from 'react-icons/bi';

const user = JSON.parse(localStorage.getItem('user'));

export default function ProfilePage() {
  const [data, setData] = useState([]);
  const [Likes, setLikes] = useState(0);
  const [loading, isLoading] = useState(true);
  const [mypost, setMypost] = useState([]);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const toast = useToast();

  useEffect(() => {
    axios
      .get('https://clickserver.onrender.com/mypost', {
        headers: { authorization: `${Cookies.get('token')}` },
      })
      .then((res) => {
        isLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const filteredData = data.filter((e) => user[0]._id === e.userID);
    setMypost(filteredData);
    console.log(filteredData)
    const likes = filteredData.reduce((acc, post) => acc + post.likes.length, 0);
    setLikes(likes);
  }, [data]);

  const handleDelete = (id) => {
    setIsDelOpen(true);
    setSelectedId(id);
  };

  const handleClose = () => {
    setIsDelOpen(false);
    setSelectedId('');
  };

  const handleConfirmDelete = () => {
    axios.delete(`https://clickserver.onrender.com/mypost/delete/${selectedId}`,
    {
      headers: { authorization: `${Cookies.get("token")}` },
    }
    ).then((res)=>{
      console.log(res.data)
    })
    const newData = mypost.filter((post) => post._id !== selectedId);
    setMypost(newData);
    setIsDelOpen(false);
    setSelectedId('');
  };

  if (loading) {
    return (
      <AbsoluteCenter>
        <RiCamera3Fill size={'70px'} fontWeight={'semi-bold'} />
      </AbsoluteCenter>
    );
  }

  return (
    <>
      <Box width="100%">
        <Box
          width={'full'}
          bg={isDark ? 'gray.800' : 'gray.50'}
          overflow={'hidden'} 
        >
          <Image
            h={'160px'}
            w={'full'}
            src={'https://wallpaperaccess.com/full/3214394.jpg'}
            objectFit="cover"
            alt="#"
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={user[0].image}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {user[0].name}
              </Heading>
            </Stack>

            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{mypost.length}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Posts
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{Likes}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Likes
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>

      {mypost.length === 0 ? (
        <Center minH="100vh">
          <Box textAlign="center" p={4}>
            <BiSad size={['48px', '64px', '80px']} />
            <Text fontSize={['md', 'xl', '2xl']} fontWeight="semibold" mt={3}>
              No posts yet
            </Text>
          </Box>
        </Center>
      ) : (
        <SimpleGrid columns={[1, 1, 3]} spacing={8} p={4}>
          {mypost.map((e) => (
            <Box
              key={e._id}
              bg={isDark ? 'gray.800' : 'white'}
              shadow="md"
              borderRadius="md"
            >
              <Box h={'300px'}>
                <Image src={e.url} h="full" w="full" objectFit="cover" />
              </Box>
              <HStack>
                <Flex
                  p={4}
                  alignItems="center"
                  justifyContent={'space-between'}
                  roundedBottom={'md'}
                  cursor={'pointer'}
                  w="full"
                >
                  <Text fontSize={'md'} fontWeight={'semibold'}>
                    {e.caption}
                  </Text>
                </Flex>
                <Flex
                  p={4}
                  alignItems="center"
                  justifyContent={'space-between'}
                  roundedBottom={'md'}
                  cursor="pointer"
                  onClick={() => handleDelete(e._id)}
                >
                  <AiFillDelete />
                </Flex>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      )}

      <AlertDialog
        isOpen={isDelOpen}
        leastDestructiveRef={undefined}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this post?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" onClick={handleConfirmDelete}>
                Delete
              </Button>
              <Button ref={undefined} onClick={handleClose}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
