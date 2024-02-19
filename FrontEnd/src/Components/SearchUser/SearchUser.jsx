import { useState } from "react";
import "./SearchUser.scss";

// import { Link } from "react-router-dom";

const SearchUser = () => {
  const [searchInp, setSearchInp] = useState("");
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      setSearchInp("");
    }
  });

  return (
    <div className="w-4/5">
      <div className="w-4/5 mt-4 ml-auto mr-auto ">
        <input
          value={searchInp}
          onChange={(e) => setSearchInp(e.target.value)}
          className="w-full h-full p-3 border rounded-md outline-green-500 animate-searchUserInput"
          type="text"
          placeholder="search-user"
        />
      </div>
    </div>
  );
};

export default SearchUser;
