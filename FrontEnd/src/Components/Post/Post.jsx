import { Link } from "react-router-dom";
import "./Post.scss";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost, updatePostCaption } from "../../Actions/postsAction";
import { useRef } from "react";
import CommentsModal from "../Modals/CommentsModal/CommentsModal";
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
  const [postComments, showPostComments] = useState(false);
  const [postCaption, setPostCaption] = useState(caption);
  const [comment, setComment] = useState("");
  const moreHorizIconRef = useRef(null);
  const dispatch = useDispatch();

  const handleLikeUnlike = () => {
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
  const handleCommentClick = () => {
    showPostComments(!postComments);
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
        <button onClick={handleLikeUnlike}>
          {liked ? (
            <FavoriteIcon style={{ color: "crimson" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
          Like
        </button>
        <button onClick={() => handleCommentClick()}>
          <ChatBubbleOutlineIcon />
        </button>
      </div>
      {!isProfile && (
        <div className="postComment">
          <div className="recentComment">
            {comments ? (
              <p>
                <img
                  src={comments[comments.length - 1]?.userAvatar.url}
                  alt=""
                />
                <span>{comments[comments.length - 1]?.userName}</span>
              </p>
            ) : null}
          </div>
          <input
            type="text"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button>
            {" "}
            <SendIcon />
          </button>
        </div>
      )}
      {postComments && (
        <CommentsModal>
          <div
            className="commentHeader"
            style={{ padding: "1.1vmax", fontFamily: "Roboto" }}
          >
            <h3 style={{ textAlign: "center" }}>{`${ownerName}'s Post`}</h3>
            <button
              id="commentBoxClose"
              onClick={() => showPostComments(!postComments)}
            >
              close
            </button>
          </div>
          <hr />
          <div className="comments">
            {comments.map((comment) => (
              <p key={comment.id}>{comment.comment}</p>
            ))}
          </div>
        </CommentsModal>
      )}
    </div>
  );
};

export default Post;
