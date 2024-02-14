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
    <>
    <h1 className=" font-bold text-green-600 mt-8 ml-4 text-3xl pb-2 h-fit">Feed</h1>
     <hr />
      <div className=" border border-t-2 border-l-0 border-r-0 border-b-0 scroll-smooth no-scrollbar mt-16 ml-auto mr-auto w-2/3 h-screen overflow-auto flex flex-col justify-start items-center">
      <Post/>
      <Post/>
      <Post/>
    </div>
    </>
  
  );
};

export default Home;
