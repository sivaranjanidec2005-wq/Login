import { useState } from "react";
import axios from "axios";

function ForgotPassword({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {

    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {

      const response = await axios.post(
        `https://login-att.onrender.com/api/auth/forgot-password?email=${email}&password=${password}`
      );

      console.log(response.data);

      setMessage(response.data);

      if (response.data === "Password Updated Successfully") {

        setTimeout(() => {
          setPage("login");
        }, 2000);

      }

    } catch (error) {

      console.log(error);

      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Server Error");
      }

    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Reset Password</h2>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleReset}>
          Update Password
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

export default ForgotPassword;