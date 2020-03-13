import React, { useState, useEffect } from "react";

const StudentEdit = ({ updateStudent, student, schools, deleteStudent }) => {
  const [studentName, setStudentName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (student) {
      setStudentName(student.studentName);
    }
  }, [student]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    updateStudent({ ...student, studentName, schoolId })
      .then(() => {
        setError("");
        window.location.hash = "#";
      })
      .catch((ex) => {
        setError(ex.response.data.message);
      });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Update Student</h2>
        <div>{error}</div>
        <input
          value={studentName}
          onChange={(ev) => setStudentName(ev.target.value)}
        />
        <select
          value={schoolId}
          onChange={(ev) => setSchoolId(ev.target.value)}
        >
          <option value="00000000-0000-0000-0000-000000000000">
            -- Choose School --
          </option>
          {schools.map((school) => {
            return (
              <option value={school.id} key={school.id}>
                {school.schoolName}
              </option>
            );
          })}
        </select>
        <a href="#">Cancel</a>
        <button>Update</button>
      </form>
      <button
        type="button"
        onClick={() => {
          window.location.hash = "#";
          return deleteStudent(student);
        }}
      >
        Delete Student
      </button>
    </div>
  );
};

export default StudentEdit;
