import { useState } from "react";
import { register } from "../services/authService";

function Register({ setPage }) {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRegister = async () => {

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.role
    ) {
      setMessage("Please fill all fields");
      setMessageType("error");
      return;
    }

    try {

      const response = await register(user);

      console.log("Response:", response.data);

      const data = response.data;

      if (data.includes("OTP sent")) {

        console.log("Going to OTP page");

        setMessage("OTP sent to your email");
        setMessageType("success");

        localStorage.setItem(
          "otpEmail",
          user.email
        );

        setPage("verifyOtp");

      } else {

        setMessage(data);
        setMessageType("error");

      }

    } catch (error) {

      console.log("ERROR:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }

      setMessage("Server Error");
      setMessageType("error");

    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Create Account</h2>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value
            })
          }
        />

        <select
          value={user.role}
          onChange={(e) =>
            setUser({
              ...user,
              role: e.target.value
            })
          }
        >
          <option value="STUDENT">
            Student
          </option>

          <option value="ADMIN">
            Admin
          </option>
        </select>

        <button onClick={handleRegister}>
          Create Account
        </button>

        <button
          className="link-btn"
          onClick={() => setPage("login")}
        >
          Back To Login
        </button>

      </div>
    </div>
  );
}

export default Register;