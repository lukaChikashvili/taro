import React, { useState } from 'react'
import { useRegisterMutation } from '../../redux/api/userSlice';
import { useNavigate } from 'react-router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [register, {isLoading}] = useRegisterMutation();

  let navigate = useNavigate();

  const handleRegister = async (e) => {
     e.preventDefault();

     try {
       await register({username, email, password}).unwrap();
      
       navigate('/profile');
      
     } catch (error) {
      console.log(error);
     }
  }


  return (
    <div className='w-full flex mt-[4rem] min-h-screen px-[30rem]'>
      
    <div className='flex flex-col gap-12 w-full'>
      <h1 className='text-4xl text-main text-center'>Registration </h1>
      
      <form onSubmit={handleRegister} className='flex flex-col gap-6 w-full'>
      <label className='text-white text-xl'>Your username</label>
      <input type = 'text' className='p-2 rounded-md shadow-md shadow-black outline-none text-black ' placeholder='Enter your username..' value = {username} onChange={(e) => setUsername(e.target.value)} />

      <label className='text-white text-xl'>Email</label>
      <input className='p-2 rounded-md shadow-md shadow-black outline-none text-black ' placeholder='Enter your email' type = 'email' value = {email} onChange={(e) => setEmail(e.target.value)} />

      <label className='text-white text-xl'>password</label>
      <input type = 'password' className='p-2 rounded-md shadow-md shadow-black outline-none text-black ' placeholder='Enter your password' value = {password} onChange={(e) => setPassword(e.target.value)} />
        
      
        <button type='submit' className = "w-full mt-4" disabled={isLoading}>{isLoading ? 'Please wait..' : 'Register'}</button>
        <span className='text-white'>already have account? <span className='underline underline-offset-4 cursor-pointer text-orange-500' onClick={() => navigate('/login')}>Login</span></span>
    </form>
    </div>
   
  </div>
  )
}

export default Register
