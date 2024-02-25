import Post from "../Post/Post";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { user } = useSelector((state) => state.user);
  const recentPost = user?.posts[0];
  const navigate = useNavigate();
  if (!user) {
    return;
  }
  return (
    <>
      <h1 className=" font-bold text-green-600 mt-8 ml-4 text-3xl pb-2 h-fit">
        Feed
      </h1>
      <hr />
      <div
        style={{ height: "calc(100vh - 100px)" }}
        className=" border border-t-2 border-l-0 border-r-0 border-b-0 scroll-smooth no-scrollbar mt-16 ml-auto mr-auto w-2/3  overflow-auto flex flex-col justify-start items-center"
      >
        {recentPost && (
          <Post
            ownerName={user.name}
            ownerId={user._id}
            ownerImage={user.avatar.url}
            caption={recentPost.caption}
            likes={recentPost.likes}
            comments={recentPost.comments}
            postImage={recentPost.image?.url}
          />
        )}
        <Post
          caption={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          necessitatibus."`}
          postImage={`https://hips.hearstapps.com/hmg-prod/images/adult-woman-taking-a-selfie-in-the-evening-with-the-royalty-free-image-1683751384.jpg?crop=1.00xw:0.446xh;0,0.360xh&resize=980:*`}
          ownerImage={user.avatar.url}
          ownerName={user.name}
          ownerId={user._id}
        />
        <Post
          caption={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          necessitatibus."`}
          postImage={`https://hips.hearstapps.com/hmg-prod/images/adult-woman-taking-a-selfie-in-the-evening-with-the-royalty-free-image-1683751384.jpg?crop=1.00xw:0.446xh;0,0.360xh&resize=980:*`}
          ownerImage={user.avatar.url}
          ownerName={user.name}
          ownerId={user._id}
        />
        <Post
          caption={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          necessitatibus."`}
          postImage={`https://hips.hearstapps.com/hmg-prod/images/adult-woman-taking-a-selfie-in-the-evening-with-the-royalty-free-image-1683751384.jpg?crop=1.00xw:0.446xh;0,0.360xh&resize=980:*`}
          ownerImage={user.avatar.url}
          ownerName={user.name}
          ownerId={user._id}
        />
      </div>
      <div className="absolute right-10 bottom-10">
        <button onClick={() => navigate("/compose/post")}>
          <AddCircleIcon
            style={{ width: "50px", height: "50px" }}
            className="text-green-600 bg-white rounded-full"
          />
        </button>
      </div>
    </>
  );
};

export default Home;
