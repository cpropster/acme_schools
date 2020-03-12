import React, { useState } from "react";

const StudentForm = ({ createStudent, schools }) => {
  const [studentName, setStudentName] = useState("");
  const [schoolId, setSchoolId] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    createStudent({ studentName, schoolId });
    setStudentName("");
    setSchoolId("");
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <h2>Create Student</h2>
        <input
          value={studentName}
          onChange={(ev) => setStudentName(ev.target.value)}
        />
        <select
          value={schoolId}
          onChange={(ev) => setSchoolId(ev.target.value)}
        >
          <option value="">~~choose school~~</option>
          {schools.map((school) => {
            return (
              <option value={school.id} key={school.id}>
                {school.schoolName}
              </option>
            );
          })}
        </select>
        <button>Create Student</button>
      </form>
    </section>
  );
};

export default StudentForm;
