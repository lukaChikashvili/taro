import { useEffect, useState } from "react"
import LangModal from "./LangModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/features/auth/modalSlice";


const Profile = () => {

const dispatch = useDispatch();

const { showModal } = useSelector((state) => state.modal);

const displayModal = () => {
  
dispatch(toggleModal());
 
}


  return (
    <div className="flex justify-start items-start h-screen ml-[6rem] mt-12">
    <div onClick={displayModal} className="w-56 h-40 bg-orange-400 text-white text-4xl font-bold flex items-center justify-center rounded-lg shadow-lg cursor-pointer transform transition duration-300 ease-in-out hover:bg-orange-600 hover:shadow-2xl">
    +
    </div>

    {showModal && <LangModal />}
  </div>
  )
}

export default Profile
