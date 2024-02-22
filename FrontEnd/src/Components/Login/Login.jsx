import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/userAction";
import { Oval } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, dispatch);
  };
  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center">
        <Oval
          visible={true}
          height="20"
          width="20"
          color="#4fa94d"
          ariaLabel="oval-loading"
          strokeWidth="7"
        />
        <span className="ml-3 font-mono">Logging in</span>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen overflow-hidden">
      <h1 className=" mt-20 text-center text-4xl font-bold font-mono">
        Hello Again!
      </h1>
      <p className="text-center text-slate-600 mt-1">Sign in to your account</p>
      <form className=" mt-4 h-4/5" onSubmit={loginHandler}>
        <div className="w-4/5 md:w-2/3 h-2/5 sm:h-2/5 md:h-1/2  ml-auto mr-auto flex flex-col items-center justify-evenly">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            className=" w-11/12 md:w-2/3 lg:w-1/3 p-5 border border-slate-200  outline-green-600 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            className=" w-11/12 md:w-2/3 lg:w-1/3 p-5 border border-slate-200  outline-green-600 rounded-xl"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Link
            to="/forget/password"
            className="text-green-600 text-left underline w-11/12 md:w-2/3 lg:w-1/3 ml-2"
          >
            <p>Forget your password ?</p>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="text-white bg-green-500 p-3 rounded w-2/3  sm:w-2/4 lg:w-1/4 active:bg-green-700 transition-all delay-100 ease-in"
            type="submit"
          >
            Sign in
          </button>

          <p className="mt-4">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have account? Let's{" "}
            <span className="text-green-600 underline">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </form>
      {/* <div className=" absolute top-4 right-3  translate-x-screen animate-wrongInput">
        <p>Email or Password is wrong</p>
      </div> */}
    </div>
  );
};

export default Login;
