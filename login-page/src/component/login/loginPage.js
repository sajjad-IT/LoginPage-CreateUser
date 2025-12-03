import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const LoginPage = () => {
  const [user_name, set_user_name] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ✔ stop page reload
    setErrorMsg("");

    try {
      const res = await fetch(
        "https://cors-anywhere.herokuapp.com/https://xivra.pk/auth/api/v1/auth/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            user_name: user_name,
            password: password
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok && data.success) {
        alert("Login Successful");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user_name", data.user_name);

        navigate("/dashboard");
      } else {
        setErrorMsg(data.MESSAGE || "Invalid credentials");
      }
    } catch (error) {
      setErrorMsg("Error logging in: " + error.message);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <input
          type="text"
          placeholder="Enter user Name"
          value={user_name}
          onChange={(e) => set_user_name(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="link-text">
          Don’t have an account? <Link to="/CreateUser">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
