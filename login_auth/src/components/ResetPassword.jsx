import { useState } from "react";
import { resetPassword } from "../services/authService";

function ResetPassword({ token, setPage }) {

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleResetPassword =
    async () => {

      try {

        const response =
          await resetPassword(
            token,
            password
          );

        setMessage(
          response.data
        );

        setTimeout(() => {

          setPage("login");

        }, 2000);

      } catch (error) {

        setMessage(
          "Server Error"
        );
      }
    };

  return (
    <div className="container">
      <div className="card">

        <h2>Reset Password</h2>

        {message && (
          <p>{message}</p>
        )}

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={
            handleResetPassword
          }
        >
          Reset Password
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;