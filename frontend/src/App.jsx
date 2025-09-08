import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login'
import { Toaster, toast } from "react-hot-toast";
import Layout from './pages/Layout'
const App = () => {

  const {user, loadingUser} = useAppContext();

  const {pathname} = useLocation()

  if(pathname === '/loading' || loadingUser) return <Loading />

  return (
    <>
    <Toaster />

 

    {user ? (    <div className="dark:bg-gray-900 dark:text-white">
      <div className='flex h-screen w-screen'>
     
        <Routes>
          <Route path='/' element={<Layout/>}>
          <Route path='/:id' element={<ChatBox/>}/>
          <Route path='/credits' element={<Credits/>}/>
          <Route path='/community' element={<Community/>}/>
          </Route>
        </Routes>
      </div>
      </div>) : (
        <div
        className="flex items-center justify-center h-screen w-screen"
        ><Login/></div>)}

    </>
  )
}

export default App