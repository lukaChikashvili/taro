import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/userSlice';
import { logout } from '../../redux/features/auth/authSlice';

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
    <div className='w-full flex items-center justify-between px-[10rem] h-[4rem]'>
       <div>
         <h1 onClick={() => navigate("/")}>logo</h1>
       </div>

       <nav>
        {userInfo ? (
            <span onClick={logoutHandler}>
            <Button name="logout" />
            </span>
        ) : (
            <span onClick={() => navigate("/login")}>
            <Button name="login" />
            </span>
        )}
       
       </nav>
    </div>
  )
}

export default NavBar
