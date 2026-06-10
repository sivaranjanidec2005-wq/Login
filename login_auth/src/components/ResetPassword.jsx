import { useState } from "react";
import axios from "axios";

function ResetPassword({ setPage }) {

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {

    const email = localStorage.getItem("forgotEmail");
    const otp = localStorage.getItem("forgotOtp");

    if (!password) {
      setMessage("Enter password");
      return;
    }

    try {
      const res = await axios.post(
        `https://login-att.onrender.com/api/auth/reset-password?email=${email}&otp=${otp}&password=${password}`
      );

      setMessage(res.data);

      if (res.data === "Password updated successfully") {

        localStorage.removeItem("forgotEmail");
        localStorage.removeItem("forgotOtp");

        setTimeout(() => {
          setPage("login");
        }, 1500);
      }

    } catch (err) {
      setMessage("Server Error");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Reset Password</h2>

        {message && <p>{message}</p>}

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleReset}>
          Reset Password
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;