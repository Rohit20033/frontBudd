
import { Navigate, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"


function PrivatePage({children}){
  let n =Cookies.get("token");
  const navigate = useNavigate()
  
   if(!n){
    return (
    
        <Navigate to="/"/>
        
    )
   }
  
   return children

   
}

export default PrivatePage