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
import Header from "../Header/Header";
const Home = () => {


  const [randomPosts, setRandomPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const { newPost } = useSelector((state) => state.posts);
  const { loading } = useSelector((state) => state.posts);

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
    <div className="ml-auto mr-auto w-2/3">
      <h1 className=" font-bold text-green-600 mt-8">Feed</h1>
      <hr />
      <div className="w-1/2">
        {loading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#5944d8", "#5944d8", "#5944d8", "#5944d8", "#5944d8"]}
          />
        )}   
        <div className="flex justify-around p-3 items-center">
          <div className="flex w-3/4 items-center">
            <img className="w-12" src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png" alt="" />
            <p className="ml-3">prisha</p>
          </div>
          <button className="  h-6 bg-green-400 text-white pl-3 pr-3 rounded-full">follow</button>
        </div>
        <div className="flex flex-col  ">
               
        </div>

        <div className="flex"></div>
      </div>
    </div>
  );
};

export default Home;
