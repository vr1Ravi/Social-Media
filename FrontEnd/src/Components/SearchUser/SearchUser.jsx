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
  return (
    <div className="relative w-full md:w-4/5">
      <div className="mb-3 ml-auto mr-auto mt-4 w-4/5">
        <input
          disabled={true}
          className="animate-searchUserInput h-full w-full rounded-md border p-3 outline-green-500"
          type="text"
          placeholder="search-user"
        />
      </div>

      {results.isLoading && (
        <div className=" absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2">
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#4fa94d"
            ariaLabel="oval-loading"
            strokeWidth="7"
          />
        </div>
      )}
      <div className="flex flex-wrap justify-start p-3 *:mb-3 *:mr-3">
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
                isSearch={true}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default SearchUser;
