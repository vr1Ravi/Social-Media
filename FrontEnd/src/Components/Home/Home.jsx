// import User from "../User/User";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import { useEffect, useState } from "react";
import PhotoIcon from "@mui/icons-material/Photo";
import {
  geRandomPosts,
  uploadPost,
  getPostsOfFollwingUsers,
} from "../../Actions/postsAction";
import { loadUser } from "../../Actions/userAction";
const Home = () => {
  const [randomPosts, setRandomPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const { newPost } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
    }
  };

  const handlePostClick = async () => {
    if (caption.length < 2) return;
    if (!imageFile) return;
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("caption", caption);
    setImagePreview(null);

    await uploadPost(formData, dispatch);

    setCaption("");
    await loadUser(dispatch);
  };

  // getting random Posts;

  useEffect(() => {
    async function bringRandomPosts() {
      const randomPosts = await geRandomPosts();
      setRandomPosts(randomPosts);
    }
    console.log("in");
    bringRandomPosts();
    getPostsOfFollwingUsers(dispatch);
  }, [reload]);

  return (
    <div className="ml-auto mr-auto w-2/3 h-screen overflow-auto">
      <h1 className=" font-bold text-green-600 mt-8">Feed</h1>
      <hr />
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-full flex justify-between pt-3 pb-3 items-center">
          <div className="flex  items-center">
            <img
              className="w-12"
              src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
              alt=""
            />
            <p className="ml-3">prisha</p>
          </div>
          <button className="h-6 bg-green-400 text-white pl-3 pr-3 rounded-full pt-2 pb-2 text-base">
            follow
          </button>
        </div>
        <div className="flex w-full flex-col bg-slate-500 h-1/3 ">
          <img src="" alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
            necessitatibus.
          </p>
        </div>

        <div className="flex"></div>
      </div>
    </div>
  );
};

export default Home;
