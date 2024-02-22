import User from "../Friends/User";
// import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../Actions/userAction";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
const SearchUser = () => {
  const [page, setPage] = useState(0);
  const results = useQuery({
    queryKey: ["page", page],
    queryFn: fetchAllUsers,
  });
  const loggedInUser = useSelector((state) => state.user.user);
  const users = results.data || [];
  if (results.isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Oval
          visible={true}
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="oval-loading"
          strokeWidth="7"
        />
      </div>
    );
  }
  return (
    <div className="w-full md:w-4/5">
      <div className="w-4/5 mt-4 ml-auto mr-auto mb-3">
        <input
          disabled={true}
          className="w-full h-full p-3 border rounded-md outline-green-500 animate-searchUserInput"
          type="text"
          placeholder="search-user"
        />
      </div>
      <div className="flex flex-wrap p-3 *:mr-3 *:mb-3 justify-start">
        {users.map((user) => {
          if (loggedInUser._id !== user._id) {
            return (
              <User
                key={user._id}
                isLoggedInUser={false}
                name={user.name}
                imageUrl={user.avatar.url}
                id={user._id}
                followers={user.followers.length}
                following={user.following.length}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default SearchUser;
