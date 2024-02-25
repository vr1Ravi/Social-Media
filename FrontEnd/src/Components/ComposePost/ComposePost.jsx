import { useDispatch, useSelector } from "react-redux";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uploadPost } from "../../Actions/postsAction";
import { Oval } from "react-loader-spinner";
import { removeError } from "../../Slices/postSlice";
const ComposePost = ({ children }) => {
  const [postImg, setPostImg] = useState(null);
  const { loading } = useSelector((state) => state.posts);
  const { error } = useSelector((state) => state.posts);

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
    await uploadPost(formData, dispatch);
    navigate("/");
  };
  if (loading) {
    return (
      <div
        style={{ left: "60%" }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center"
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
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center"
      >
        <h1>
          Something is up with server.{" "}
          <Link
            onClick={() => dispatch(removeError)}
            className=" underline"
            to={"/"}
          >
            Click here to go back
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
        className="absolute top-1/2 overflow-y-auto left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center w-full h-full border opacity-95 shadow-md "
      ></div>
      <div className="absolute top-1/2 overflow-y-auto left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-1/2 h-1/2 md:h-5/6 flex flex-col justify-center items-center">
        <div className="flex justify-end w-full ">
          <button className=" font-mono" onClick={() => navigate("/")}>
            Close
          </button>
        </div>

        <div className="w-5/6 md:w-full  h-full  border rounded-lg overflow-y-auto">
          <form
            onSubmit={(e) => handlePost(e)}
            className="w-full h-full flex flex-col justify-between items-center  bg-white"
          >
            <input
              type="text"
              name="caption"
              placeholder="What is happening!"
              className=" w-full p-5 outline-none"
              required
            />
            {postImg && (
              <img src={postImg} className="w-full md:w-1/2 md:h-1/2" />
            )}

            <div className=" relative  flex w-full justify-between items-center border-t-2 p-3">
              <div className="absolute w-10">
                <PhotoSizeSelectActualIcon
                  style={{ width: "40px" }}
                  className=" text-green-600 cursor-pointer"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                className=" w-10 rounded-xl z-10 opacity-0"
                onChange={handleComposePost}
                name="image"
              />
              <button
                type="submit"
                className="bg-green-500 p-3 rounded-md w-1/4 text-white font-semibold font-mono"
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
