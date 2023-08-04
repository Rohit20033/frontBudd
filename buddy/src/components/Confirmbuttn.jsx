import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


function AlertDialogExample({isOpen,isDelOpen,id}) {
  const cancelRef = React.useRef()
  const navigate=useNavigate()

  const onClose=()=>{
    isDelOpen(false)
  }

  const handleClick=()=>{
    axios.delete(`https://buddy-3ini.onrender.com/mypost/delete/${id}`,
    {
      headers: { authorization: `${Cookies.get("token")}` },
    }
    ).then((res)=>{
      console.log(res.data)
      navigate("/create")
    })
    onClose()
    
  }

  return (
    <>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleClick} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
export default AlertDialogExample