import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserProfileSetting = () => {
const user = useSelector(state => state.user.user)
  return (
    <div className='w-full md:w-4/5 mt-20'>
      <form className='w-full flex justify-around' >
      <input
            type="file"
            accept="image/*"
          className=" w-32 h-32 p-5 border  border-black  outline-green-600 rounded-xl z-10"
            onChange={(e) => handleUserProfile(e)}
            placeholder="Choose a Profile Pic"
          />
          <img
            className="w-40 h-40 rounded-full absolute mt-2"
            style={
              {
                top: "23%",
                left: "40%",
                transform: "translate(-50%,-50%)"
              }
            }
            src={
              "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
            }
            alt="profile"
          />
          
          <div className='flex flex-col items-center justify-center'>
            <input type="text" placeholder='Enter new Name'/>
            <input type="text" placeholder='Enter new Bio'/>
          </div>
      </form>
    </div>
  )
}

export default UserProfileSetting