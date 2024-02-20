import { Link } from "react-router-dom";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

const Post = ({
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
}) => {
  const { user } = useSelector((state) => state.user);
  const isLiked = likes.find((like) => like._id === user._id);
  const handlePostLikeUnlike = () => {
    console.log("ok");
  };
  return (
    <div className="w-full md:w-2/3 flex flex-col justify-center items-center mt-2">
      <div className="w-full flex justify-between pt-3 pb-3 items-center">
        <div className="flex  items-center">
          <img
            className="w-12 rounded-full cursor-pointer"
            id={ownerId}
            src={
              ownerImage
                ? ownerImage
                : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
            }
            alt=""
          />
          <p className="ml-3">{ownerName}</p>
        </div>
        <button className=" h-10 bg-green-400 text-white pl-3 pr-3 rounded-full pt-2 pb-2 ">
          follow
        </button>
      </div>

      <div className="flex w-full flex-col">
        <img className=" h-80 w-full" src={postImage} alt="" />
        <p className="mt-4">{caption}</p>
        <div className="w-1/2 flex mt-2 justify-between">
          <div>
            {isLiked ? (
              <FavoriteIcon
                onClick={handlePostLikeUnlike}
                className=" cursor-pointer"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={handlePostLikeUnlike}
                className=" cursor-pointer"
              />
            )}
            <span className="ml-2">{likes.length}</span>
          </div>
          <div>
            <ChatBubbleOutlineIcon className="cursor-pointer" />
            <span className="ml-2">{comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
