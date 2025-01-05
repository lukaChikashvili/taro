import { useEffect, useState } from "react"
import LangModal from "./LangModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/features/auth/modalSlice";
import { useAllLanguagesQuery } from "../../redux/api/languageSlice";


const Profile = () => {

const dispatch = useDispatch();

const { showModal } = useSelector((state) => state.modal);

const {data: allLangs, error, isLoading, isError, refetch} = useAllLanguagesQuery();

 

useEffect(() => {
  if (allLangs) {
    refetch();
  }
}, [allLangs]);

if (isLoading) {
  return <p>Loading languages...</p>;
}


if (isError) {
  return <p>Error fetching languages: {error.message}</p>;
}


const displayModal = () => {
  
dispatch(toggleModal());
 
}



  return (
    <div className="flex justify-start items-start h-screen ml-[6rem] mt-12 text-white">
    <div onClick={displayModal} className="w-56 h-40 bg-orange-400 text-white text-4xl font-bold flex items-center justify-center rounded-lg shadow-lg cursor-pointer transform transition duration-300 ease-in-out hover:bg-orange-600 hover:shadow-2xl">
    +
    </div>

    {showModal && <LangModal />}

    <div className="ml-12 flex flex-wrap gap-12">
        {allLangs.data && allLangs?.data.length > 0 ? (
          allLangs.data?.map((lang) => (
            <div key={lang._id} className="mb-2 w-56 h-40 bg-gray-400 text-white text-4xl font-bold flex flex-col items-center justify-center rounded-lg shadow-lg cursor-pointer transform transition duration-300 ease-in-out hover:bg-orange-600 hover:shadow-2xl">
              <h3 className="text-xl font-bold">{lang?.name}</h3>
              <p>{lang?.level}</p>
            </div>
          ))
        ) : (
          <p>No languages available</p>
        )}

</div>
  </div>
  )
}

export default Profile
