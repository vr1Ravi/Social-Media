import { useState } from "react";
import { registerUser } from "../../Actions/userAction";
import "./Register.scss";
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
    window.location.href = '/';
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
    <div className="loginContainer">
      <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
        <h3>Social App</h3>
        <div className="inputImageBox">
          {" "}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUserProfile(e)}
            placeholder="Choose a Profile Pic"
            style={{
              width: "100px",
              height: "100px",
              opacity: 0,
              zIndex: 1,
              position: "relative",
            }}
          />
          <img
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              width: "100px",
              cursor: "pointer",
              borderRadius: "50%",
            }}
            src={
              profileImgPreview
                ? profileImgPreview
                : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
            }
            alt="profile"
          />
        </div>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Bio"
          required
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
