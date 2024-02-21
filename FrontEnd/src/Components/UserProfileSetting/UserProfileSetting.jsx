import { useState } from "react";
import { useSelector } from "react-redux";
const UserProfileSetting = () => {
  const user = useSelector((state) => state.user.user);

  const [showModal, setShowModal] = useState(false);
  const handleSaveNewPassword = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="w-full md:w-4/5 mt-10 flex justify-center items-center h-screen">
        <form className=" relative w-4/5 flex flex-col items-center justify-start shadow-sm shadow-green-500 h-4/5">
          <input
            type="file"
            accept="image/*"
            className=" w-32 h-32 p-5 border  border-black  outline-green-600 rounded-xl z-10 opacity-0"
            // onChange={(e) => handleUserProfile(e)}
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
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
              className=" w-full p-5 border text-white border-slate-200  bg-green-600 rounded-xl font-semibold font-mono"
            >
              Change Password
            </button>
          </div>

          <button
            className="absolute bottom-2 right-2 w-1/3 md:w-1/5 p-5 bg-green-600 text-white rounded-xl font-semibold font-mono"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
      {showModal && (
        <div className="absolute flex flex-col justify-center items-center w-full h-full  bg-white opacity-90 shadow-md">
          <div className="flex justify-end w-5/6 md:w-1/2">
            <button className=" font-mono" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
          <div className="w-5/6 md:w-1/2  h-1/2 p-4 border rounded-lg">
            <form className="w-full h-full flex flex-col justify-around items-start">
              <label htmlFor="oldPass">
                Old password
                <input
                  id="oldPass"
                  type="password"
                  required
                  placeholder="Old Password"
                  className=" w-full p-3 outline-green-500 rounded-md border"
                />
              </label>
              <label htmlFor="newPass">
                New password
                <input
                  id="newPass"
                  type="password"
                  required
                  placeholder="New Password"
                  className=" w-full p-3 outline-green-500 rounded-md border"
                />
              </label>
              <button
                onClick={handleSaveNewPassword}
                className="bg-green-500 p-3 rounded-md w-1/4 text-white font-semibold font-mono"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileSetting;
