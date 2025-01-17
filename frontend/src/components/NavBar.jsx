import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/userSlice';
import { logout } from '../../redux/features/auth/authSlice';
import { LogIn, LogOut} from 'lucide-react'
import logo from '../assets/logo.png'

const NavBar = () => {
    let navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            
           await logoutApiCall().unwrap();
           dispatch(logout());
           localStorage.removeItem('jwt');
           navigate('/');
  
        } catch (error) {
           console.log(error)
        }
      }

  return (
    <div className='w-full flex items-center justify-between px-[6rem] h-[6rem]'>
       <div>
         <h1 onClick={() => navigate("/")} className='text-white text-xl flex items-center gap-2'>
          <img src = {logo} className='w-16 ' />
          FluentFlow</h1>
       </div>

       <nav>
        {userInfo ? (
            <span onClick={logoutHandler}>
            <Button name="logout" icon = {<LogOut size = {20} />} />
            </span>
        ) : (
            <span onClick={() => navigate("/login")}>
            <Button name="login" icon={<LogIn size = {20} />}/>
            </span>
        )}
       
       </nav>
    </div>
  )
}

export default NavBar
