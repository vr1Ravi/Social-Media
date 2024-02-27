import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useState } from "react";
const ProfilePost = ({ caption, postSrc, likes, comments }) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      onMouseOver={() => setShowDelete(true)}
      onMouseOut={() => setShowDelete(false)}
      className="  cursor-pointer relative flex w-full flex-col rounded-lg mb-4"
    >
      {showDelete && (
        <DeleteSweepIcon className="absolute right-0 top-0 text-rose-600 cursor-pointer" />
      )}
      <img className=" h-1/2 w-full rounded-lg" src={postSrc} alt="post-pic" />
      <p className="mt-4">{caption}</p>
      <div className="w-1/2 flex mt-2 justify-between">
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
  );
};

export default ProfilePost;
