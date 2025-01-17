import { useEffect, useState } from "react"
import LangModal from "./LangModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/features/auth/modalSlice";
import { useAllLanguagesQuery, useDeleteLangMutation } from "../../redux/api/languageSlice";
import { Trash2} from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const Profile = () => {

const dispatch = useDispatch();


 let navigate = useNavigate();


const { showModal } = useSelector((state) => state.modal);

const {data: allLangs, error, isLoading, isError, refetch} = useAllLanguagesQuery();

const [deleteLang] = useDeleteLangMutation();

 

useEffect(() => {
  if (allLangs) {
    refetch();
  }
}, [allLangs?.data]);

if (isLoading) {
  return <p className="text-white text-center mt-12">Loading languages...</p>;
}


if (isError) {
  return <p>Error fetching languages: {error.message}</p>;
}


const displayModal = () => {
  
dispatch(toggleModal());
 
}

const deleteLanguage = async (id) => {
   
    let answer = window.confirm("Are you sure you want to delete?");
    if(!answer) return;

    await deleteLang(id).unwrap();
    refetch();

   
}


  return (
    <div className="flex justify-start items-start h-screen ml-[6rem] mt-12 text-white">
    <div onClick={displayModal} className="w-56 h-40 bg-orange-400 text-white text-4xl font-bold flex items-center justify-center rounded-lg shadow-lg cursor-pointer transform transition duration-300 ease-in-out hover:bg-orange-600 hover:shadow-2xl">
    +
    </div>

    {showModal && <LangModal />}

    <div  className="ml-12 flex flex-wrap gap-12">
        {allLangs.data && allLangs?.data.length > 0 ? (
          allLangs.data?.map((lang) => (
            <div onClick={() => navigate(`/langhub/${lang.name}/${lang._id}`)}  key={lang._id} className="mb-2 w-56 h-40 bg-gray-400 text-white text-4xl font-bold flex flex-col gap-2 items-center justify-center rounded-lg shadow-lg cursor-pointer transform transition duration-300 ease-in-out hover:bg-orange-600 hover:shadow-2xl">
              <h3 className="text-xl font-bold">{lang?.name}</h3>
              <p>{lang?.level}</p>
              <Trash2 size = {20} className="duration-500 ease hover:text-black" onClick={(e) => {
          e.stopPropagation(); 
          deleteLanguage(lang?._id);
        }} />
            </div>
          ))
        ) : (
          <p className="text-center ml-[25rem] mt-12">No languages available</p>
        )}

</div>
  </div>
  )
}

export default Profile
