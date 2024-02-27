import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { likeUnlikePost } from "../../Actions/postsAction";
import { useEffect, useState } from "react";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(likes.length);
  const [postComments, setPostComments] = useState(comments.length);
  const [showComment, setShowComment] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const isLiked = likes.includes(user._id);
    setIsLiked(isLiked);
  }, []);

  const handlePostLikeUnlike = async () => {
    setIsLiked(!isLiked);
    setTimeout(() => {
      isLiked
        ? setPostLikes((postLikes) => postLikes - 1)
        : setPostLikes((postLikes) => postLikes + 1);
    }, 100);
    await likeUnlikePost(postId, dispatch);
  };

  return (
    <div
      className={`  w-full md:w-2/3 flex flex-col justify-center items-center mt-2`}
    >
      <div className="w-full flex justify-between pt-3 pb-3 items-center">
        <div className="flex  items-center">
          <Link to={`/profile/${ownerId}`}>
            <img
              className="w-12 h-12 rounded-full cursor-pointer"
              id={ownerId}
              src={
                ownerImage
                  ? ownerImage
                  : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
              }
              alt=""
            />
          </Link>
          <p className="ml-3">{ownerName}</p>
        </div>
        {user.name !== ownerName && (
          <button className=" h-10 bg-green-400 text-white pl-3 pr-3 rounded-full pt-2 pb-2 ">
            follow
          </button>
        )}
      </div>

      <div className="flex w-full flex-col">
        <img className=" h-80 w-full" src={postImage} alt="" />
        <p className="mt-4">{caption}</p>
        <div className="w-1/2 flex mt-2 justify-between">
          <div>
            {isLiked ? (
              <FavoriteIcon
                onClick={handlePostLikeUnlike}
                className=" cursor-pointer text-red-400"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={handlePostLikeUnlike}
                className=" cursor-pointer"
              />
            )}
            <span className="ml-2">{postLikes}</span>
          </div>
          <div>
            <ChatBubbleOutlineIcon
              className="cursor-pointer"
              onClick={() => setShowComment(!showComment)}
            />
            <span className="ml-2">{postComments}</span>
          </div>
        </div>
      </div>
      {showComment && (
        <div className=" flex-col drop-shadow-2xl flex justify-start py-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-1/3 h-2/3 overflow-auto">
          <div className="w-full relative mb-3">
            <button
              className="absolute right-1 font-mono"
              onClick={() => setShowComment(!showComment)}
            >
              close
            </button>
          </div>
          {comments.map((comment) => {
            <div className="flex items-center m-2">
              <img
                className=" w-10 h-10 rounded-full"
                src={ownerImage}
                alt=""
              />
              <p className=" font-mono ml-2">Hello Nich pic</p>
            </div>;
          })}
          <form className="w-full absolute bottom-0 overflow-hidden">
            <input
              className="w-full border-2 outline-none rounded-md border-green-500 p-2 my-1 "
              type="text"
              name="comment"
            />
            <button className="absolute right-3 top-3">
              <SendIcon className="text-green-600" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
