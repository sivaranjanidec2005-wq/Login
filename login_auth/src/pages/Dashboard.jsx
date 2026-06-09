import { useState } from "react";

function Dashboard({ setPage }) {
  const [selectedSubject, setSelectedSubject] = useState("");

  const subjects = [
    "Java",
    "Python",
    "React",
    "Database",
    "Software Engineering",
    "Machine Learning"
  ];

  return (
    <div className="container">
      <div className="card">
        <h2>Select Subject</h2>

        <div className="subjects">
          {subjects.map((subject) => (
            <div
              key={subject}
              className={`subject-card ${
                selectedSubject === subject ? "active" : ""
              }`}
              onClick={() => setSelectedSubject(subject)}
            >
              {subject}
            </div>
          ))}
        </div>

        <button
  onClick={() => {
    if (!selectedSubject) {
      alert("Please select a subject");
      return;
    }

    localStorage.setItem(
      "subject",
      selectedSubject
    );

    setPage("attendance");
  }}
>
  Continue
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

export default Dashboard;