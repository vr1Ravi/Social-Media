import { useState } from "react";
import { registerUser } from "../../Actions/userAction";
import { useDispatch } from "react-redux";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgPreview, setProfileImgPreview] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("bio", bio);
    formData.append("profileImg", profileImg);
    await registerUser(dispatch, formData);
    window.location.href = "/timeline";
  };
  const handleUserProfile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImgPreview(reader.result);
      };
    }
  };
  return (
    <div className="h-screen overflow-hidden w-full">
      <h1 className=" mt-4 text-center text-4xl font-bold font-mono">
        Hello Welcome!
      </h1>
      <p className="text-center text-slate-600 mt-1 mb-4">
        Sign up to your account
      </p>
      <form className="mt-1 h-4/5" onSubmit={(e) => handleSubmit(e)}>
        <div className="w-4/5  h-full ml-auto mr-auto flex flex-col items-center justify-evenly relative">
          {" "}
          <input
            type="file"
            accept="image/*"
            className="w-24  p-5 border border-slate-200  outline-green-600 rounded-xl z-10 opacity-0"
            onChange={(e) => handleUserProfile(e)}
            placeholder="Choose a Profile Pic"
          />
          <img
            className=" w-24 h-24 rounded-full absolute"
            style={{
              top: "10%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
            src={
              profileImgPreview
                ? profileImgPreview
                : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
            }
            alt="profile"
          />
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            className="w-11/12 md:w-2/3 lg:w-1/3 p-5 border border-slate-200  outline-green-600 rounded-xl"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            className="w-11/12 md:w-2/3 lg:w-1/3 p-5 border border-slate-200  outline-green-600 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            className="w-11/12 md:w-2/3 lg:w-1/3 p-5 border border-slate-200  outline-green-600 rounded-xl"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Bio"
            required
            value={bio}
            className="w-11/12 md:w-2/3 lg:w-1/3 p-5 border border-slate-200  outline-green-600 rounded-xl"
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
          <button
            className="text-white bg-green-500 p-3 rounded w-2/3 lg:w-1/4 active:bg-green-700 transition-all delay-100 ease-in"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
