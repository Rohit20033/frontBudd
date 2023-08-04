import logo from './logo.svg';
import './App.css';
import AllRoutes from './pages/AllRoutes';
import { useEffect, useState } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import RotateLoader from "react-spinners/RotateLoader";
import Index from './components/sideBar';



function App() {
  const [loading,setLoading]=useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode ==="dark"
  useEffect(()=>{
   setLoading(true)
   setTimeout(()=>{
     setLoading(false)
   },3000)
  },[])
  return (
    <div className="App">
       {
        loading  ? <Box  marginTop={["250px","300px","300px","400px"]}>
        <RotateLoader
      color={isDark ? "gold" : "red"}
      loading={loading}
      // cssOverride={override}
      size={40}
      
    />
      
      </Box>:
    <>
    <Index/>
    
    </>
       }
    </div>
  );
}

export default App;
