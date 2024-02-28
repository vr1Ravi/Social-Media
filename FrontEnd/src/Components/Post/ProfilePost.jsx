import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useState } from "react";
import { deletePost } from "../../Actions/postsAction";
import { useDispatch, useSelector } from "react-redux";
const ProfilePost = ({
  postId,
  caption,
  postSrc,
  likes,
  comments,
  isLoggedUser,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const message = useSelector((state) => state.posts.message);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.message);
  const handleDeletePost = () => {
    deletePost(postId, dispatch);
  };

  return (
    <>
      {message && (
        <div className=" animate-deleteBtnAnimation absolute right-0 top-3 flex h-10 w-[20%] translate-x-full items-center justify-center rounded-md bg-white p-3 shadow-2xl transition-all">
          <span className="font-bold text-green-600">{message}</span>
        </div>
      )}
      {error && (
        <div className=" animate-deleteBtnAnimation absolute right-0 top-3 flex h-10 w-[20%] translate-x-full items-center justify-center rounded-md bg-white p-3 shadow-2xl transition-all">
          <span className="font-bold text-red-600">{error}</span>
        </div>
      )}

      <div
        onMouseOver={() => setShowDelete(true)}
        onMouseOut={() => setShowDelete(false)}
        className="  relative mb-4 flex w-full cursor-pointer flex-col rounded-lg"
      >
        {isLoggedUser && showDelete && (
          <DeleteSweepIcon
            onClick={handleDeletePost}
            className="absolute right-0 top-0 cursor-pointer text-rose-600"
          />
        )}
        <img
          className=" h-1/2 w-full rounded-lg"
          src={postSrc}
          alt="post-pic"
        />
        <p className="mt-4">{caption}</p>
        <div className="mt-2 flex w-1/2 justify-between">
          <div>
            <FavoriteBorderIcon />
            <span className="ml-2">{likes}</span>
          </div>
          <div>
            <ChatBubbleOutlineIcon />
            <span className="ml-2">{comments}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePost;
