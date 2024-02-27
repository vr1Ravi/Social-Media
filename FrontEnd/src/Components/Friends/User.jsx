import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Link } from "react-router-dom";

const User = ({ isSearch, name, imageUrl, id, followers, following }) => {
  console.log(followers, following);
  return (
    <Link
      to={`/profile/${id}`}
      className="relative flex flex-col justify-start w-1/4 h-1/5 md:h-1/4  items-center border rounded-sm"
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
      {!isSearch && (
        <DeleteSweepIcon className="absolute right-0 top-0 text-pink-600 cursor-pointer" />
      )}
    </Link>
  );
};

export default User;
