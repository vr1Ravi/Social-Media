import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserToSearchId } from "../../Slices/userSlice";
const User = ({ isLoggedInUser, name, imageUrl, id, followers, following }) => {
  const dispatch = useDispatch();

  return (
    <Link
      onClick={() => {
        dispatch(setUserToSearchId(id));
      }}
      to={`/${name}`}
      className="relative flex flex-col justify-start w-1/4 h-1/5 md:h-1/3 items-center border rounded-sm"
    >
      <img
        className="w-20 h-20 mb-4 rounded-full mt-3"
        src={
          imageUrl
            ? imageUrl
            : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
        }
        alt=""
      />
      <h4 className=" text-green-500 text-xl font-semibold">{name}</h4>

      <div className="flex w-full justify-evenly items-center">
        <p>
          {followers}
          <span>
            <i> Followers</i>
          </span>
        </p>
        <p>
          {following}
          <span>
            <i> following</i>
          </span>
        </p>
      </div>
      {isLoggedInUser && (
        <DeleteSweepIcon className="absolute right-0 top-0 text-pink-600 cursor-pointer" />
      )}
    </Link>
  );
};

export default User;
