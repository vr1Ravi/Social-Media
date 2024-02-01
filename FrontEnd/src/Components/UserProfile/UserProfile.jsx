import { useState } from "react";
import { Link } from "react-router-dom";
import Post from "../Post/Post";
import Modal from "../Modals/EditModal/EditModal";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import CloseIcon from "@mui/icons-material/Close";
import { updateProfile } from "../../Actions/userAction";
import {
  logoutRequest,
  logoutSuccess,
  logoutFaliure,
} from "../../Slices/userSlice";
import "./UserProfile.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// userName={loggedInUser?.name}
//               userAvatar={loggedInUser?.avatar.url}
//               userEmail={loggedInUser?.email}
//               userBio={loggedInUser?.bio}
//               userJoinedDate={loggedInUser?.joinedDate}
//               userFollowers={loggedInUser?.followers}
//               userFollowing={loggedInUser?.following}
//               userPosts={loggedInUser?.posts}
//               userId={loggedInUser?._id}
const UserProfile = ({ isAuthenticatedUser }) => {
  // State for profile editing
  const loggedInUser = useSelector((state) => state.user.user);
  const followers = useSelector((state) => state.user.followers);
  const followings = useSelector((state) => state.user.followings);

  const [newName, setNewName] = useState(loggedInUser.name);
  const [newEmail, setNewEmail] = useState(loggedInUser.email);
  const [newBio, setNewBio] = useState(loggedInUser.bio);
  const [profilePicPreview, setProfilePicPreview] = useState(
    loggedInUser.avatar.url
  );
  const [profileImg, setProfileImg] = useState(loggedInUser.avatar.url);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const dispatch = useDispatch();

  const date = new Date(loggedInUser.joinedDate);
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
    } catch (error) {
      dispatch(logoutFaliure);
    }
  };
  return (
    <div className="userProfile">
      {/* User Information */}
      <div className="userInfo">
        <div className="userUpperPart">
          <img src={loggedInUser.avatar.url} alt="userProfilePic" />
          {isAuthenticatedUser && (
            <div className="profileUppeButtons">
              <button onClick={handleEditProfileClick}>Edit profile</button>

              <button onClick={handleUserLogout}>
                <Link to={"/"}>LogOut</Link>
              </button>
            </div>
          )}
        </div>
        <div className="userLowerPart">
          <p>{loggedInUser.name}</p>
          <p>{loggedInUser.bio}</p>
          <p>Joined {formattedDate}</p>
        </div>
        <div className="userFooter">
          <div className="userFollowing">
            <Link
              to="/profile/following"
              style={{ textDecoration: "none", color: "black" }}
            >
              {followers.length}{" "}
              <span style={{ color: "rgb(138 152 165)" }}> Followers</span>
            </Link>
          </div>
          <div className="userFollower">
            <Link
              to="/profile/following"
              style={{ textDecoration: "none", color: "black" }}
            >
              {followings.length}{" "}
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
        {loggedInUser.posts.map((post) => (
          <Post
            postId={post?._id}
            caption={post?.caption}
            postImage={post?.image?.url}
            likes={post?.likes}
            comments={post?.comments}
            ownerImage={loggedInUser.avatar.url}
            ownerName={loggedInUser.name}
            key={post?._id}
            ownerId={loggedInUser._id}
            isProfile={true}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
