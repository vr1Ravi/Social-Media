import { Link } from "react-router-dom";
import "./Post.scss";
import RecommendIcon from "@mui/icons-material/Recommend";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, updatePostCaption } from "../../Actions/postsAction";
import { useRef } from "react";
const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isProfile = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [editDisplay, setEditDisplay] = useState(false);
  const [editCaption, displayEditCaption] = useState(false);
  const [postCaption, setPostCaption] = useState(caption);
  const moreHorizIconRef = useRef(null);
  const dispatch = useDispatch();
  const handleLike = () => {
    setLiked(!liked);
  };
  document.addEventListener("click", (e) => {
    if (e.target !== moreHorizIconRef.current && editDisplay) {
      setEditDisplay(!editDisplay);
    }
  });
  document.addEventListener("scroll", () => {
    displayEditCaption(!editCaption);
  });
  const handleMoreHorizonClick = () => {
    setEditDisplay(!editDisplay);
  };
  const handleCaptionupdateClick = () => {
    displayEditCaption(!editCaption);
  };
  const saveCaption = async () => {
    await updatePostCaption(postCaption, postId);
    location.reload();
  };
  const handleDeleteClick = async () => {
    await deletePost(postId, dispatch);
    setEditDisplay(!editDisplay);
  };

  return (
    <div className="postBox">
      <div className="postHeader">
        <div className="postOwnerDetails">
          <img
            src={ownerImage}
            alt="ownerImage"
            id="userImage"
            style={{ borderRadius: "100%" }}
          />
          <Link to={`/profile/${ownerId}`}>
            <p style={{ fontWeight: "700" }}>{ownerName}</p>
          </Link>
          {isProfile && (
            <MoreHorizIcon
              ref={moreHorizIconRef}
              onClick={handleMoreHorizonClick}
            />
          )}

          {isProfile ? (
            editDisplay ? (
              <div className="editBox">
                <button onClick={handleCaptionupdateClick}>Edit Caption</button>
                <button onClick={handleDeleteClick}>Delete</button>
              </div>
            ) : null
          ) : null}
        </div>
        {editCaption && (
          <div className="editCaptionBox">
            <div>
              <input
                type="text"
                value={postCaption}
                onChange={(e) => setPostCaption(e.target.value)}
              />
              <button onClick={saveCaption}>save</button>
            </div>
          </div>
        )}
        <p
          style={{
            fontWeight: "100",
            color: "rgba(0, 0, 0, 0.5)",
          }}
        >
          {caption}
        </p>
      </div>
      <img src={postImage} alt="postImg" />

      <button>{likes.length} likes</button>
      <div className="postFooter">
        <button onClick={handleLike}>
          {liked ? (
            <FavoriteIcon style={{ color: "crimson" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
          Like
        </button>
        <button>
          <ChatBubbleOutlineIcon /> Comment
        </button>
      </div>
    </div>
  );
};

export default Post;
