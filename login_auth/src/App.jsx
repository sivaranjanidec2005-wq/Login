import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {

  const [page, setPage] = useState(
    localStorage.getItem("loggedIn")
      ? "dashboard"
      : "login"
  );

  return (
    <>
      {page === "login" && (
        <Login setPage={setPage} />
      )}

      {page === "register" && (
        <Register setPage={setPage} />
      )}

      {page === "verifyOtp" && (
        <VerifyOtp setPage={setPage} />
      )}

      {page === "dashboard" && (
        <Dashboard setPage={setPage} />
      )}

      {page === "attendance" && (
        <Attendance setPage={setPage} />
      )}

      {page === "forgot" && (
        <ForgotPassword setPage={setPage} />
      )}
      {page === "resetPassword" && (
        <ResetPassword setPage={setPage} />
      )}
    </>
  );
}

export default App;