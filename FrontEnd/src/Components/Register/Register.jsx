import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Actions/userAction";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const [profileImgPreview, setProfileImgPreview] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [minChar, setMinChar] = useState(false);
  const [minDigit, setMinDigit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setMinChar(e.target.value.length >= 8);
    setMinDigit(/\d/.test(e.target.value));
    setShowPasswordValidation(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("profileImg", profileImg);
    await registerUser(dispatch, formData);
    navigate("/");
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
    <div className="h-screen overflow-y-auto w-full">
      <h1 className=" mt-4 text-center text-4xl font-bold font-mono">
        Hello Welcome!
      </h1>
      <p className="text-center text-slate-600 mt-1 mb-4">
        Sign up to your account
      </p>
      <form
        className="mt-1 w-4/5  h-full ml-auto mr-auto flex flex-col items-center justify-start relative"
        onSubmit={(e) => handleSubmit(e)}
      >
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
            top: "5%",
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
          name="name"
          required
          // value={name}
          className="mt-8 w-11/12 md:w-2/3 lg:w-1/3 p-2 border border-slate-200  outline-green-600 rounded-xl"
          // onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          // value={email}
          className="mt-8 w-11/12 md:w-2/3 lg:w-1/3 p-2 border border-slate-200  outline-green-600 rounded-xl"
          // onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mt-8 w-11/12 md:w-2/3 lg:w-1/3 relative ">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            required
            value={password}
            className="w-full p-2 border border-slate-200  outline-green-600 rounded-xl"
            onChange={handlePasswordChange}
            onClick={() => setShowPasswordValidation(true)}
          />
          {showPassword ? (
            <VisibilityIcon
              onClick={() => setShowPassword(false)}
              className=" absolute right-1 top-2 text-gray-400 cursor-pointer"
            />
          ) : (
            <VisibilityOffIcon
              onClick={() => setShowPassword(true)}
              className=" absolute right-1 top-2 text-gray-400 cursor-pointer"
            />
          )}
        </div>
        {showPasswordValidation && (
          <div className="flex flex-col absolute bg-white shadow p-2 rounded-md top-1/4 left-1/2">
            <p
              style={{ color: minChar ? "green" : "" }}
              className=" inline-block font-thin text-sm text-amber-700"
            >
              - 8 characters minimum
            </p>
            <p
              style={{ color: minDigit ? "green" : "" }}
              className=" inline-block font-thin text-sm text-amber-700"
            >
              - At least one number
            </p>
          </div>
        )}
        <input
          type="text"
          placeholder="Bio"
          name="bio"
          required
          // value={bio}
          className="mt-8 w-11/12 md:w-2/3 lg:w-1/3 p-2 border border-slate-200  outline-green-600 rounded-xl"
          // onChange={(e) => {
          //   setBio(e.target.value);
          // }}
        />
        <button
          className="mt-8 text-white bg-green-500 p-3 rounded w-2/3 lg:w-1/4 active:bg-green-700 transition-all delay-100 ease-in"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
