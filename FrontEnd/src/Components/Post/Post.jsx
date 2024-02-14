import { Link } from "react-router-dom";

import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  updatePostCaption,
  postComment,
  likeUnlikePost,
} from "../../Actions/postsAction";
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
  loadPosts,
  reload,
}) => {

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-2">
    <div className="w-full flex justify-between pt-3 pb-3 items-center">
      <div className="flex  items-center">
        <img
          className="w-12"
          src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
          alt=""
        />
        <p className="ml-3">prisha</p>
      </div>
      <button className=" h-10 bg-green-400 text-white pl-3 pr-3 rounded-full pt-2 pb-2 ">
        follow
      </button>
    </div>
    <div className="flex w-full flex-col">
      <img className=" h-80 w-full" src="https://hips.hearstapps.com/hmg-prod/images/adult-woman-taking-a-selfie-in-the-evening-with-the-royalty-free-image-1683751384.jpg?crop=1.00xw:0.446xh;0,0.360xh&resize=980:*" alt="" />
      <p className="mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
        necessitatibus.
      </p>
      <div className="w-1/2 flex mt-2 justify-between">
        <div><FavoriteBorderIcon/><span className="ml-2">0</span></div>  
         <div><ChatBubbleOutlineIcon/><span className="ml-2">0</span></div> 
      </div>
    </div>
  </div>
  );
};

export default Post;
