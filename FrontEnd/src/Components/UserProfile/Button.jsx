const Button = ({ btn }) => {
  // const handleLogoutClick = async () => {
  //   await logOutUser(dispatch);
  //   localStorage.removeItem("path");
  //   localStorage.removeItem("isAuthenticated");
  //   navigate("/");
  // };
  console.log(btn);
  return (
    <button className="absolute top-2 right-2 w-1/5 md:w-1/12 p-2 bg-green-600 text-white rounded-md font-semibold font-mono">
      {btn}
    </button>
  );
};

export default Button;
