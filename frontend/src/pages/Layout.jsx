import React, {useState} from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { assets } from '../assets/assets';

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
    <>
       {!isMenuOpen && <img src={assets.menu_icon}
    className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert"
    onClick={()=>setIsMenuOpen(true)}
    
    />}
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <Outlet/>
    </>
  )
}

export default Layout