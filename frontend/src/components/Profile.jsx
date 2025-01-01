import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {

    const { userInfo } = useSelector(state => state.auth);

  return (
    <div>
      {userInfo.username}
    </div>
  )
}

export default Profile
