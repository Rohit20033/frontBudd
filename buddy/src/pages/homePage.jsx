import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Box,
  Text,
  Image,
  Flex,
  Skeleton,
  SkeletonCircle,
  useColorMode,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';

const user = JSON.parse(localStorage.getItem('user'));

export default function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const toast = useToast();
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  useEffect(() => {
    axios
      .get('https://clickserver.onrender.com/mypost', {
        headers: { authorization: `${Cookies.get('token')}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Also set loading to false if an error occurs
      });
  }, []);

  const handleLike = (id, liked) => {
    axios
      .post(
        `https://clickserver.onrender.com/like/like`,
        { postId: id, userId: user[0]._id },
        {
          headers: { authorization: `${Cookies.get('token')}` },
        }
      )
      .then((res) => {
        if (res.data.message === 'Liked') {
          setData((prevData) =>
            prevData.map((item) =>
              item._id === id ? { ...item, likes: [...item.likes, user[0]._id] } : item
            )
          );
        } else if (res.data.message === 'Unliked') {
          setData((prevData) =>
            prevData.map((item) =>
              item._id === id ? { ...item, likes: item.likes.filter((userId) => userId !== user[0]._id) } : item
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Error',
          description: 'Error liking/unliking the post',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      
      {loading ? (
        <Flex align="center" direction="column" my={5} mx={[0, 5]} overflow="hidden">
          <Box w={['sx', 'sm', 'lg']} rounded="lg" bg={isDark ? 'dark' : '#fff'} shadow="md">
            <Skeleton height="500px" width="100%" />
            <Flex p={4} justify="space-between">
              <Skeleton height="20px" width="70%" />
              <Skeleton height="20px" width="30%" />
            </Flex>
            <Flex p={4} justify="space-between">
              <Flex align="center" cursor="pointer">
                <SkeletonCircle size="30px" />
                <Box ml="2" fontWeight="semibold" color={isDark ? 'gray.300' : 'gray.600'}>
                  <Skeleton height="20px" width="80px" />
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      ) : (
        
        data.map((e) => {
          const isPostLiked = e.likes.includes(user[0]._id);

          return (
            <Flex key={e.id} align="center" direction="column" my={5} mx={[0, 5]} overflow="hidden">
              <Box w={['sx', 'sm', 'lg']} rounded="lg" bg={isDark ? 'dark' : '#fff'} shadow="md">
                <Image src={e.url} h="500px" w="full" objectFit="cover" />
                <Flex p={4} justify="space-between">
                  <Text fontSize="md" fontWeight="bold">
                    {e.caption}
                  </Text>
                  <Text fontSize="md" fontWeight="semibold">
                    {e.likes.length} likes
                  </Text>
                </Flex>
                <Flex p={4} justify="space-between">
                  <Flex align="center" cursor="pointer" onClick={() => handleLike(e._id, isPostLiked)}>
                    {isPostLiked ? (
                      <BsHeartFill color="red" fontSize="28px" />
                    ) : (
                      <BsHeart color={isDark ? 'white' : 'black'} fontSize="28px" />
                    )}
                    <Box ml="2" fontWeight="semibold" color={isDark ? 'gray.300' : 'gray.600'}>
                      {isPostLiked ? 'Liked' : 'Like'}
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          );
        })
      )}
    </>
  );
}
