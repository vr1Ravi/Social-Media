import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Actions/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, dispatch);
  };
  return (
    <div className="h-screen">
      <h1 className=" mt-20 text-center text-4xl font-bold font-mono">Hello Again!</h1>
      <p className="text-center text-slate-600 mt-1">Sign in to your account</p>
      <form className=" mt-1 h-4/5"  onSubmit={loginHandler}>

        <div className="w-4/5  h-2/3  ml-auto mr-auto flex flex-col items-center justify-evenly">
        <input
          type="email"
          placeholder="Email"
          required 
          value={email}
          className=" w-4/5 lg:w-1/3 p-5 border border-slate-200  outline-green-600 rounded-xl"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          className=" w-4/5 lg:w-1/3 p-5 border border-slate-200  outline-green-600 rounded-xl"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
          <Link to="/forget/password" className="text-green-600 text-left">
          <p >Forget your password ?</p>
        </Link>
        </div>
        <button type="submit">Login</button>
        <Link to="/register">New Here?</Link>
      </form>
    </div>
  );
};

export default Login;
