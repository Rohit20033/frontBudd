import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Image,
  Button,
  Heading,
  Stack,
  VStack,
  BoxProps,
  Drawer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue
} from '@chakra-ui/react';
import {  AiOutlineHome } from 'react-icons/ai';
import {MdCreate} from "react-icons/md"
import { BsFolder2, BsCalendarCheck } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {RiCamera3Fill } from 'react-icons/ri';
import AllRoutes from '../pages/AllRoutes';
import Cookies from 'js-cookie'
import ColorModeToggle from './colorMode';

const t = Cookies.get("token")
const user = JSON.parse(localStorage.getItem("user"))
console.log(user)

export default function Index() {
  const { isOpen, onClose, onOpen } = useDisclosure();
 
  
  return (
    <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent  w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          w="full"
          px="4"
          d={{ base: 'flex', md: 'none' }}
          borderBottomWidth="1px"
          borderColor={useColorModeValue('inherit', 'gray.700')}
          bg={useColorModeValue('white', 'gray.800')}
          justify={{ base: 'space-between', md: 'flex-end' }}
          boxShadow="lg"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />

          <Flex align="center">
            <ColorModeToggle/>
          </Flex>
        </Flex>

        <Box as="main" p={14} minH="30rem" bg={useColorModeValue('auto', 'gray.800')}>
          {/* <Stack
            direction={{ base: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent="center"
            h="100%"
          > */}
           
          <AllRoutes/>
            
          {/* </Stack> */}
        </Box>
      </Box>
    </Box>
  );
}
const handleLog=()=>{
  Cookies.remove("token")
  localStorage.removeItem("user")
  window.location.reload()
}

const SidebarContent = ({ ...props }: BoxProps) => (
  
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    // pb="10"
    overflowX="hidden"
    overflowY="auto"
    bg={useColorModeValue('white', 'gray.800')}
    borderColor={useColorModeValue('inherit', 'gray.700')}
    borderRightWidth="1px"
    w="60"
    {...props}
  >
    <VStack h="full" w="full" alignItems="flex-start" justify="space-between">
      <Box w="full">
        <Flex px="4" py="5" align="center">
          <Icon as={RiCamera3Fill} h={8} w={8} />
          <Link to="/home">
          <Text
            fontSize="2xl"
            ml="2"
            color={useColorModeValue('brand.500', 'white')}
            fontWeight="semibold"
          >
            CLICK
          </Text>
          </Link>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="md"
          color="gray.600"
          aria-label="Main Navigation"
        >
         {
          t ?  <>
           <Link to="/home">
           <NavItem  icon={AiOutlineHome}>Dashboard</NavItem>
           </Link>
           <Link to="/create">
           <NavItem icon={MdCreate}>Create</NavItem>
           </Link>
          </>
          :
          null
         }
        </Flex>
      </Box>

      <Flex px="4" py="5" mt={10} justify="center" alignItems="center">
        {
          t ? <>
          <Menu>
          <MenuButton
            as={Button}
            size={'sm'}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            _hover={{ textDecoration: 'none' }}
          >
           {
            t ?   <Avatar
            size={'lg'}
            name=""
            src={user[0].image}
          />:
           null
           }
          </MenuButton>
          <MenuList fontSize={17} zIndex={5555}>
            <Link to="/profile">
            <MenuItem >
              My profile
            </MenuItem>
            </Link>
            <MenuItem onClick={handleLog}>Logout</MenuItem>
          </MenuList>
        </Menu>
          </>
          :
          null
        }
      </Flex>
    </VStack>
  </Box>
);

const NavItem = (props: any) => {
  const color = useColorModeValue('gray.600', 'gray.300');

  const { icon, children } = props;
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue('inherit', 'gray.400')}
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.900'),
        color: useColorModeValue('gray.900', 'gray.200')
      }}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: color
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};