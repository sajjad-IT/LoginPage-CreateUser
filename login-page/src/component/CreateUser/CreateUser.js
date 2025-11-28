import React, { useState } from "react";
import "./CreateUser.css";

const Login = () => {
  const [user_id, set_user_id] = useState(null);
  const [user_name, set_user_name] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [password, set_Password] = useState("");
  const [email_address, set_email_address] = useState("");

  const handleRegister = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("user_name", user_name);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("password", password);
      formData.append("email_address", email_address);

      const res = await fetch(
        "https://xivra.pk/auth/api/v1/users/create_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: formData.toString(),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("User registered successfully");
      } else {
        alert("Failed to register user");
      }
    } catch (error) {
      alert("Error registering user: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Register User</h2>
      <input
        className="form-input"
        type="text "
        value={user_id}
        placeholder="UserName"
        onChange={(e) => set_user_id(e.target.value)}
      />

      <input
        className="form-input"
        type="text "
        value={user_name}
        placeholder="UserName"
        onChange={(e) => set_user_name(e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        value={first_name}
        placeholder="first Name"
        onChange={(e) => set_first_name(e.target.value)}
      />

      <input
        className="form-input"
        type="text"
        value={last_name}
        placeholder="last Name"
        onChange={(e) => set_last_name(e.target.value)}
      />
      <input
        className="form-input"
        type="email"
        value={email_address}
        placeholder="email"
        onChange={(e) => set_email_address(e.target.value)}
      />
      <input
        className="form-input"
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => set_Password(e.target.value)}
      />

      {/* <input className='form-input' type="tel" placeholder='Phone Number' onChange={(e)=>SetPhone(e.target.value)} /> */}

      <button className="form-btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Login;
