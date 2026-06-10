import { useState } from "react";
import axios from "axios";

function VerifyOtp({ setPage }) {

  const [email] = useState(
    localStorage.getItem("otpEmail") || localStorage.getItem("forgotEmail") || ""
  );

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const verifyOtp = async () => {

    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    try {

      const res = await axios.post(
        `https://login-att.onrender.com/api/auth/verify-otp?email=${email}&otp=${otp}`
      );

      const response = res.data;

      setMessage(response);

      // ================= REGISTER FLOW =================
      if (response.includes("Email verified successfully")) {

        localStorage.removeItem("otpEmail");

        setTimeout(() => {
          setPage("login");
        }, 1500);
      }

      // ================= FORGOT PASSWORD FLOW =================
      if (response.includes("OTP verified")) {

        localStorage.setItem("forgotOtp", otp);

        setTimeout(() => {
          setPage("resetPassword");
        }, 1500);
      }

    } catch (error) {

      console.log(error);
      setMessage("Server Error");
    }
  };

  const resendOtp = async () => {

    try {

      const emailToUse =
        localStorage.getItem("otpEmail") ||
        localStorage.getItem("forgotEmail");

      const res = await axios.post(
        `https://login-att.onrender.com/api/auth/resend-otp?email=${emailToUse}`
      );

      setMessage(res.data);

    } catch (error) {

      console.log(error);
      setMessage("Unable to resend OTP");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Verify OTP</h2>

        <input
          type="email"
          value={email}
          readOnly
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={verifyOtp}>
          Verify OTP
        </button>

        <button onClick={resendOtp}>
          Resend OTP
        </button>

        {message && <p>{message}</p>}

        <button onClick={() => setPage("login")}>
          Back To Login
        </button>

      </div>
    </div>
  );
}

export default VerifyOtp;