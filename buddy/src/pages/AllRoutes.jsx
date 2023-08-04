import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './homePage'
import SignUp from './SignUp'
import LoginPage from './LoginPage'
import ProfilePage from './profilePage'
import PrivatePage from './PrivatePage'
import CreatePost from './CreatePost'


function AllRoutes() {
  return (
    <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={
          <PrivatePage>
            <HomePage/>
          </PrivatePage>
        }/>
        <Route path='/profile' element={
          <PrivatePage>
            <ProfilePage/>
          </PrivatePage>
        }/>
        <Route path='/create' element={
          <PrivatePage>
            <CreatePost/>
          </PrivatePage>
        }/>

    </Routes>
  )
}

export default AllRoutes