import { useState } from "react";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="loginContainer">
      <form className="loginForm">
        <h3>Social App</h3>
        <div className="inputImageBox">
          {" "}
          <input
            type="file"
            accept="image/*"
            onChange={() => {}}
            placeholder="Choose a Profile Pic"
            // style={{ opacity: "0" }}
          />
        </div>

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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
