import { useState } from "react";
import { login } from "../services/authService";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter email and password");
      setMessageType("error");
      return;
    }

    try {
      const response = await login({
        email,
        password,
      });

      console.log(response.data);

      if (
        response.data.message ===
        "Login Successful"
      ) {
        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "loggedIn",
          "true"
        );

        localStorage.setItem(
          "email",
          email
        );

        setMessage("Login Successful");
        setMessageType("success");

        setTimeout(() => {
          setPage("dashboard");
        }, 1000);
      } else {
        setMessage(
          response.data.message
        );
        setMessageType("error");
      }
    } catch (error) {
      console.log(error);

      setMessage("Server Error");
      setMessageType("error");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <button
          className="link-btn"
          onClick={() =>
            setPage("register")
          }
        >
          Create New Account
        </button>

        <button
          className="link-btn"
          onClick={() =>
            setPage("forgot")
          }
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}

export default Login;