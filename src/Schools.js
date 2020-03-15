import React, { useState, useEffect } from "react";

const Schools = ({ schools, students, student, updateStudent }) => {
  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    if (student) {
      setStudentName(student.studentName);
      setSchoolId(student.schoolId);
    }
  }, [student]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    updateStudent({ ...student, studentId, studentName, schoolId })
      .then(() => {
        setError("");
      })
      .catch((ex) => {
        setError(ex.response.data.message);
      });
  };

  return schools.map((school) => {
    const filteredStudents = students.filter((stud) => {
      return stud.schoolId === school.id;
    });
    if (school.schoolName !== "UnEnrolled") {
      return (
        <form
          key={school.id}
          onSubmit={onSubmit}
          className="border border-dark"
        >
          <h2>
            <a href={`#view=school&id=${school.id}`}>{school.schoolName}</a>
          </h2>
          <div>{error}</div>
          <select
            id={school.id}
            value={studentId}
            onChange={(ev) => {
              setSchoolId(ev.target.id);
              setStudentName(ev.target.selectedOptions[0].text);
              setStudentId(ev.target.value);
            }}
          >
            <option value="">-- enroll a student --</option>
            {students.map((student) => {
              return (
                <option value={student.id} key={student.id}>
                  {student.studentName}
                </option>
              );
            })}
          </select>
          <button>Enroll Student</button>
          <ul>
            {filteredStudents.map((s) => {
              return (
                <div key={s.id}>
                  <li>
                    <a href={`#view=student&id=${s.id}`}>{s.studentName}</a>
                  </li>
                </div>
              );
            })}
          </ul>
        </form>
      );
    }
  });
};

export default Schools;
