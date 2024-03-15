import { useDispatch, useSelector } from "react-redux";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uploadPost } from "../../Actions/postsAction";
import { Oval } from "react-loader-spinner";
import { setPosts } from "../../Slices/userSlice";
import CloseIcon from "@mui/icons-material/Close";
const ComposePost = ({ children }) => {
  const [postImg, setPostImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { posts } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleComposePost = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPostImg(reader.result);
      };
    }
  };
  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get("caption")) {
      return;
    }
    if (!formData.get("image")) {
      alert("Select Image");
      return;
    }
    setLoading(true);
    const post = await uploadPost(formData, navigate);
    setLoading(false);
    if (post) {
      console.log(post);
      dispatch(setPosts([post, ...posts]));
    } else {
      setError(true);
    }
  };
  if (loading) {
    return (
      <div
        style={{ left: "60%" }}
        className="absolute top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center"
      >
        <Oval
          visible={true}
          height="20"
          width="20"
          color="#4fa94d"
          ariaLabel="oval-loading"
          strokeWidth="7"
        />
        <span className="ml-3 font-mono">Posting</span>
      </div>
    );
  }
  if (error) {
    return (
      <div
        style={{ left: "60%" }}
        className="absolute top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center"
      >
        <h1>
          Something is up with server.{" "}
          <Link onClick={() => setError(false)} className="underline" to={"/"}>
            Click here to go back home
          </Link>
        </h1>
      </div>
    );
  }
  return (
    <>
      {children}
      <div
        style={{ backgroundColor: "#999999" }}
        className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-y-auto border opacity-95 shadow-md "
      ></div>
      <div className="absolute left-1/2 top-1/2 flex h-[60%] w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-y-auto sm:w-[60%] lg:w-[40%]">
        <div className="w-5/6  md:w-full">
          <button
            className=" float-right cursor-pointer font-mono"
            onClick={() => navigate("/")}
          >
            <CloseIcon style={{ color: "green", fontWeight: "bold" }} />
          </button>
        </div>
        <div className="h-full w-5/6  overflow-y-auto  rounded-lg border bg-white md:w-full">
          <form
            onSubmit={(e) => handlePost(e)}
            className="flex h-full w-full flex-col items-center justify-between  "
          >
            <input
              type="text"
              name="caption"
              placeholder="What is happening!"
              className=" w-full p-5 outline-none"
              required
            />
            {postImg && <img src={postImg} className="h-full w-full  p-4" />}

            <div className=" relative  flex w-full items-center justify-between border-t-2 bg-white p-3">
              <div className="absolute w-10">
                <PhotoSizeSelectActualIcon
                  style={{ width: "40px" }}
                  className=" cursor-pointer text-green-600"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                className=" z-10 w-10 rounded-xl opacity-0"
                onChange={handleComposePost}
                name="image"
              />
              <button
                type="submit"
                className="w-1/4 rounded-md bg-green-500 p-3 font-mono font-semibold text-white"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ComposePost;
