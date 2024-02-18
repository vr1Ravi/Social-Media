import React, { useState } from "react";
import { useSelector } from "react-redux";
import PasswordChangeModal from "../Modals/PasswordChangeModal";
const UserProfileSetting = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const [showModal, setShowModal] = useState(false);
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };
  return (
    <div className="w-full md:w-4/5 mt-10 flex justify-center items-center h-screen">
      <form className=" relative w-4/5 flex flex-col items-center justify-start shadow-sm shadow-green-500 h-4/5">
        <input
          type="file"
          accept="image/*"
          className=" w-32 h-32 p-5 border  border-black  outline-green-600 rounded-xl z-10 opacity-0"
          onChange={(e) => handleUserProfile(e)}
          placeholder="Choose a Profile Pic"
        />
        <img
          className="w-40 h-40 rounded-full absolute mt-2"
          style={{
            top: "8%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          src={user.avatar.url}
          alt="profile"
        />

        <div className="w-full grid grid-rows-4 lg:grid-cols-2 gap-4 mt-4 p-8">
          <input
            className=" w-full p-5 border border-slate-200  outline-green-600 rounded-xl"
            type="text"
            placeholder="Enter new Name"
          />
          <input
            className=" w-full p-5 border border-slate-200  outline-green-600 rounded-xl"
            type="text"
            placeholder="Enter new Bio"
          />
          <input
            className=" w-full p-5 border border-slate-200  outline-green-600 rounded-xl"
            type="text"
            placeholder="Enter new Bio"
          />
          <button
            onClick={handlePasswordChange}
            className=" w-full p-5 border text-white border-slate-200  bg-green-600 rounded-xl"
          >
            Change Password
          </button>
        </div>
        <button
          className="absolute bottom-2 right-2 w-1/3 md:w-1/5 p-5 bg-green-600 text-white rounded-xl"
          type="submit"
        >
          Save
        </button>
        {showModal && (
          <div className="absolute w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600">
            <PasswordChangeModal />
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfileSetting;
