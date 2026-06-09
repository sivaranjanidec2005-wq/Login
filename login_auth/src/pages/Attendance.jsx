function Attendance({ setPage }) {
  const subject = localStorage.getItem("subject");

  return (
    <div className="container">
      <div className="card">
        <h2>{subject}</h2>

        <div className="attendance-box">
          <h1>90%</h1>
          <p>Attendance</p>
        </div>

        <div className="stats">
          <div className="stat">
            <h3>50</h3>
            <p>Total</p>
          </div>

          <div className="stat">
            <h3>45</h3>
            <p>Present</p>
          </div>

          <div className="stat">
            <h3>5</h3>
            <p>Absent</p>
          </div>
        </div>

        <button
  onClick={() => setPage("dashboard")}
>
  Back
</button>

<button
  className="link-btn"
  onClick={() => {
    setPage("login");
  }}
>
  Back To Login
</button>

<button
  className="logout-btn"
  onClick={() => {
    localStorage.clear();
    setPage("login");
  }}
>
  Logout
</button>
      </div>
    </div>
  );
}

export default Attendance;