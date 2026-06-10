import { useState } from "react";
import axios from "axios";

function ForgotPassword({ setPage }) {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {

    if (!email) {
      setMessage("Please enter email");
      return;
    }

    try {
      const res = await axios.post(
        `https://login-att.onrender.com/api/auth/forgot-password?email=${email}`
      );

      setMessage(res.data);

      if (res.data === "OTP sent to email") {

        localStorage.setItem("forgotEmail", email);

        setTimeout(() => {
          setPage("verifyOtp");   // reuse OTP page
        }, 1000);
      }

    } catch (err) {
      setMessage("Server Error");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Forgot Password</h2>

        {message && <p>{message}</p>}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSendOtp}>
          Send OTP
        </button>

        <button onClick={() => setPage("login")}>
          Back To Login
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;