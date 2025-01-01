import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useLoginMutation } from '../../redux/api/userSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/profile';
  
    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate, redirect, userInfo]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            if(res.token) {
                dispatch(setCredentials({...res}));
                localStorage.setItem('jwt', res.token);
                navigate(redirect);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <input type = 'email' value = {email} onChange={(e) => setEmail(e.target.value)} />
        <input type = 'password' value = {password} onChange={(e) => setPassword(e.target.value)} />
          
          <button type='submit' disabled={isLoading}>{isLoading ? 'გთხოვთ დაელოდოთ..' : 'შესვლა'}</button>
      </form>
    </div>
  )
}

export default Login
