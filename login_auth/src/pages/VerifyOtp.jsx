import { useState } from "react";
import axios from "axios";

function VerifyOtp({ setPage }) {

  const [email] = useState(
    localStorage.getItem("otpEmail") || ""
  );

  const [otp, setOtp] = useState("");

  const [message, setMessage] =
    useState("");

  const verifyOtp = async () => {

    try {

      const res = await axios.post(
        `http://localhost:8081/api/auth/verify-otp?email=${email}&otp=${otp}`
      );

      setMessage(res.data);

      if (
        res.data.includes(
          "Registration Successful"
        )
      ) {

        localStorage.removeItem(
          "otpEmail"
        );

        setTimeout(() => {

          setPage("login");

        }, 1500);
      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Server Error"
      );
    }
  };

  const resendOtp = async () => {

    try {

      const res = await axios.post(
        `http://localhost:8081/api/auth/resend-otp?email=${email}`
      );

      setMessage(res.data);

    } catch (error) {

      console.log(error);

      setMessage(
        "Unable to resend OTP"
      );
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
          onChange={(e) =>
            setOtp(
              e.target.value
            )
          }
        />

        <button
          onClick={verifyOtp}
        >
          Verify OTP
        </button>

        <button
          onClick={resendOtp}
        >
          Resend OTP
        </button>

        <p>{message}</p>

        <button
          onClick={() =>
            setPage("login")
          }
        >
          Back To Login
        </button>

      </div>
    </div>
  );
}

export default VerifyOtp;