import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLanguageMutation } from '../../redux/api/userSlice';

const Profile = () => {

    const { userInfo } = useSelector(state => state.auth);

    const [name, setName]  = useState('');
    const [level, setLevel] = useState('');

     const [language, {isLoading}] = useLanguageMutation();

     
    const createLang = async (e) => {
      e.preventDefault();

      try {
         
       const res = await language({name, level}).unwrap();

       console.log(res);


      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
      <form onSubmit={createLang}>
      <input type = "text" placeholder='language name' onChange={(e) => setName(e.target.value)}/>
       <input type = "text" placeholder='choose level' onChange={(e) => setLevel(e.target.value)}/>
       <button type='submit'>submit</button>
      </form>
      
    </div>
  )
}

export default Profile
