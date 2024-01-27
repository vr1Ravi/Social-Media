// import User from "../User/User";
import "./Home.scss";

import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import { useEffect, useState } from "react";
import PhotoIcon from "@mui/icons-material/Photo";
import { geRandomPosts, uploadPost } from "../../Actions/postsAction";
import { loadUser } from "../../Actions/userAction";
const Home = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [randomPosts, setRandomPosts] = useState([]);
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
    bringRandomPosts();
  }, []);

  return (
    <div className="homeContainer">
      <div className="homeLeft">
        <div className="createPost">
          <div className="caption">
            <img src={user.avatar.url} alt="user" />
            <input
              type="text"
              placeholder={`What's happening ${user.name}`}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <hr />
          <div className="postImage">
            <div className="imageToPost">
              {imagePreview && <img src={imagePreview} alt="imagePreview" />}
            </div>
            <div className="actionToPost">
              {" "}
              <PhotoIcon />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageInputChange}
              />
              <button onClick={handlePostClick}>Post</button>
            </div>
          </div>
        </div>
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
        {newPost && (
          <Post
            key={newPost._id}
            postId={newPost._id}
            caption={newPost.caption}
            postImage={newPost.image.url}
            likes={newPost.likes}
            comments={newPost.comments}
            ownerImage={user.avatar.url}
            ownerName={user.name}
            ownerId={user._id}
            isDelete={true}
          />
        )}
        {randomPosts &&
          randomPosts.map((post) => {
            return (
              <Post
                key={post._id}
                postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner.image.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
              />
            );
          })}
        {posts &&
          posts.map((post) => {
            return (
              <Post
                key={post._id}
                postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerImage={user.avatar.url}
                ownerName={post.name}
                ownerId={user._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
