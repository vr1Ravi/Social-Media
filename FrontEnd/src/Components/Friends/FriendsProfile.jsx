import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const FriendsProfile = () => {
  return (
    <div className="relative flex flex-col justify-start w-1/4 h-1/5 md:h-1/3 items-center border rounded-sm">
      <img
        className="w-20 h-20 mb-4"
        src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
        alt=""
      />
      <h4 className=" text-green-500 text-xl font-semibold">Friday</h4>

      <p>
        0{" "}
        <span>
          <i>Followers</i>
        </span>
      </p>

      <DeleteSweepIcon className="absolute right-0 top-0 text-pink-600 cursor-pointer" />
    </div>
  );
};

export default FriendsProfile;
