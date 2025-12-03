import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateUser.css";

const CreateUser = () => {
  const [user_name, set_user_name] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, setemail] = useState("");
  const [password, set_password] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const res = await fetch(
        "https://cors-anywhere.herokuapp.com/https://xivra.pk/auth/api/v1/users/create_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            user_name,
            email,
            password,
            first_name,
            last_name,
           
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok && data.success) {
        alert("User Registered Successfully!");
        navigate("/");
      } else {
        alert(data.MESSAGE || "Registration failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Register User</h2>

      <form onSubmit={handleRegister}>
        <input
          className="form-input"
          type="text"
          placeholder="User Name"
          value={user_name}
          onChange={(e) => set_user_name(e.target.value)}
          required
        />

        <input
          className="form-input"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />

        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => set_password(e.target.value)}
          required
        />

        <input
          className="form-input"
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => set_first_name(e.target.value)}
          required
        />

        <input
          className="form-input"
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => set_last_name(e.target.value)}
          required
        />

        

        <button className="form-btn" type="submit">
          Register
        </button>
      </form>

      <p className="link-text">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default CreateUser;
