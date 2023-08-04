import { extendTheme } from "@chakra-ui/react"
 
const theme = {
    colors:{
        primary:"#F68989",
        secondary:"#B7CADB",
        third:"white",
        waring:"yellow",
        danger:"red"
      },
    config:{
      intialColorMode:"dark",
      useSystemColorMode:true
    },
   style:{
    globle:{
        body : {
            margin: 0,
            "font-family": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
           " -webkit-font-smoothing": "antialiased" ,
            "-moz-osx-font-smoothing": "grayscale",
            
            
            
          },
          
          code :{
           " font-family": "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace"
          },
          
         
          
         
          
          
          
    },
   },
}


export default extendTheme(theme) 