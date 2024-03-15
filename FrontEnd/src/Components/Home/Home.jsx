import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Post from "../Post/Post";
const Home = () => {
  const { user } = useSelector((state) => state.user);
  const botPosts = JSON.parse(localStorage.getItem("botPosts")) || [];
  console.log(botPosts);
  const navigate = useNavigate();
  if (!user) {
    return;
  }
  return (
    <>
      <h1 className=" ml-4 mt-8 h-fit pb-2 text-3xl font-bold text-green-600">
        Feed
      </h1>
      <hr />
      <div
        style={{ height: "calc(100vh - 100px)" }}
        className=" no-scrollbar ml-auto mr-auto mt-16 flex w-2/3 flex-col items-center justify-start overflow-auto scroll-smooth  border border-b-0 border-l-0 border-r-0 border-t-2"
      >
        {botPosts?.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            ownerName={post.owner.name}
            ownerId={post.owner._id}
            ownerImage={post.owner.avatar.url}
            caption={post.caption}
            likes={post.likes}
            comments={post.comments}
            postImage={post.image?.url}
          />
        ))}
      </div>
      <div className="absolute bottom-10 right-10">
        <button onClick={() => navigate("/compose/post")}>
          <AddCircleIcon
            style={{ width: "50px", height: "50px" }}
            className="rounded-full bg-white text-green-600"
          />
        </button>
      </div>
    </>
  );
};

export default Home;
