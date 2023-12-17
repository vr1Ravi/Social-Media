import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../Post/Post";
import Modal from "../Modals/EditModal/EditModal";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import CloseIcon from "@mui/icons-material/Close";
import { loadUser, updateProfile } from "../../Actions/userAction";
import {
  logoutRequest,
  logoutSuccess,
  logoutFaliure,
} from "../../Slices/userSlice";
import "./UserProfile.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
const UserProfile = ({
  userName,
  userAvatar,
  userEmail,
  userBio,
  userJoinedDate,
  userFollowers,
  userFollowing,
  userPosts,
  userId,
}) => {
  // State for profile editing
  const [newName, setNewName] = useState(userName);
  const [newEmail, setNewEmail] = useState(userEmail);
  const [newBio, setNewBio] = useState(userBio);
  const [profilePicPreview, setProfilePicPreview] = useState(userAvatar);
  const [profileImg, setProfileImg] = useState(userAvatar);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const dispatch = useDispatch();

  const date = new Date(userJoinedDate);
  const options = {
    year: "numeric",
    month: "long",
  };
  const formattedDate = date.toLocaleString("en-US", options);

  // Handle Edit Profile button click
  const handleEditProfileClick = () => {
    setShowEditProfileModal(!showEditProfileModal);
  };

  // Handle Close Modal button click
  const handleCloseModal = () => {
    setShowEditProfileModal(!showEditProfileModal);
    setNewName(userName);
    setNewEmail(userEmail);
    setNewBio(userBio);
  };
  console.log();
  // Handle image change for profile picture
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImg(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
    }
  };

  // Handle profile save button click
  const handleProfileSave = async () => {
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    formData.append("newName", newName);
    formData.append("newEmail", newEmail);
    formData.append("newBio", newBio);

    await updateProfile(dispatch, formData);
  };
  // Handle User Logout
  const handleUserLogout = async () => {
    try {
      dispatch(logoutRequest());
      const { data } = await axios.get("/api/v1/logout");
      dispatch(logoutSuccess());

      console.log(data);
    } catch (error) {
      dispatch(logoutFaliure);
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="userProfile">
      {/* User Information */}
      <div className="userInfo">
        <div className="userUpperPart">
          <img src={userAvatar} alt="userProfilePic" />
          <div className="profileUppeButtons">
            <button onClick={handleEditProfileClick}>Edit profile</button>

            <button onClick={handleUserLogout}>
              <Link to={"/"}>LogOut</Link>
            </button>
          </div>
        </div>
        <div className="userLowerPart">
          <p>{userName}</p>
          <p>{userBio}</p>
          <p>Joined {formattedDate}</p>
        </div>
        <div className="userFooter">
          <div className="userFollowing">
            <Link
              to="/profile/following"
              style={{ textDecoration: "none", color: "black" }}
            >
              {userFollowers.length}{" "}
              <span style={{ color: "rgb(138 152 165)" }}> Followers</span>
            </Link>
          </div>
          <div className="userFollower">
            <Link
              to="/profile/following"
              style={{ textDecoration: "none", color: "black" }}
            >
              {userFollowing.length}{" "}
              <span style={{ color: "rgb(138 152 165)" }}>Following</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <Modal>
          <div className="editProfileContainer">
            <div className="editProfileBox">
              <div className="editProfilePic">
                <CameraEnhanceIcon />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <img src={profilePicPreview} alt="profilePic" />
                <button className="editSaveButton" onClick={handleProfileSave}>
                  Save
                </button>
                <div className="close">
                  <CloseIcon onClick={handleCloseModal} />
                </div>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter New Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="inputBox">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter New Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  id="bio"
                  placeholder="Enter New Bio"
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* User Posts */}
      <div className="userPosts">
        {userPosts?.map((post) => (
          <Post
            postId={post?._id}
            caption={post?.caption}
            postImage={post?.image?.url}
            likes={post?.likes}
            comments={post?.comments}
            ownerImage={userAvatar}
            ownerName={userName}
            key={post?._id}
            ownerId={userId}
            isProfile={true}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
