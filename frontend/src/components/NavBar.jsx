import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router'

const NavBar = () => {
    let navigate = useNavigate();
  return (
    <div className='w-full flex items-center justify-between px-[10rem] h-[4rem]'>
       <div>
         <h1 onClick={() => navigate("/")}>logo</h1>
       </div>

       <nav>
        <span onClick={() => navigate("/login")}>
         <Button name="login" />
         </span>
       </nav>
    </div>
  )
}

export default NavBar
