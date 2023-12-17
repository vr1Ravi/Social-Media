import "./Login.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Actions/userAction";
// import { useSelector } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, dispatch);
  };
  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={loginHandler}>
        <h3>Social App</h3>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Link to="/forget/password">
          <p>Forget password</p>
        </Link>
        <button type="submit">Login</button>
        <Link to="/register">New Here?</Link>
      </form>
    </div>
  );
};

export default Login;
