import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLanguageMutation } from '../../redux/api/userSlice';
import { hideModal } from '../../redux/features/auth/modalSlice';

const LangModal = () => {
    const { userInfo } = useSelector(state => state.auth);

    const [name, setName]  = useState('');
    const [level, setLevel] = useState('');

     const [language, {isLoading}] = useLanguageMutation();
     const dispatch = useDispatch();
     
    const createLang = async (e) => {
      e.preventDefault();

      try {
         
       const res = await language({name, level}).unwrap();
       dispatch(hideModal());

       
       console.log(res);


      } catch (error) {
        console.log(error)
      }
    }
  return (
    
    <div className="bg-white w-[500px] h-[400px] p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl z-10">
      <h2 className="text-2xl font-semibold mb-4">Add New Language</h2>
      <form onSubmit={createLang} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Language Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Choose Level"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full py-3 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  
  )
}

export default LangModal
