import React from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const ProfilePost = () => {
  return (
    <div className="flex w-full flex-col rounded-lg mb-4">
      <img
        className=" h-80 w-full rounded-lg"
        src="https://hips.hearstapps.com/hmg-prod/images/adult-woman-taking-a-selfie-in-the-evening-with-the-royalty-free-image-1683751384.jpg?crop=1.00xw:0.446xh;0,0.360xh&resize=980:*"
        alt=""
      />
      <p className="mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
        necessitatibus.
      </p>
      <div className="w-1/2 flex mt-2 justify-between">
        <div>
          <FavoriteBorderIcon />
          <span className="ml-2">0</span>
        </div>
        <div>
          <ChatBubbleOutlineIcon />
          <span className="ml-2">0</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
