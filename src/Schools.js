import React, { useState, useEffect } from "react";

const Schools = ({
  schools,
  students,
  student,
  updateStudent,
  //   unenrollStudent,
}) => {
  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState("");
  const [schoolId, setSchoolId] = useState("");

  useEffect(() => {
    if (student) {
      setStudentName(student.studentName);
      setSchoolId(student.schoolId);
    }
  }, [student]);

  //   const onSubmit = (ev) => {
  //     ev.preventDefault();
  //     updateStudent({ ...student, studentName, schoolId })
  //       .then(() => {
  //         setError("");
  //       })
  //       .catch((ex) => setError(ex.response.data.message));
  //   };

  //   const onChange = (ev) => {
  //     const currentSchool = schools.filter((school) => {
  //         return
  //     })
  //     setSchoolId(currentSchool.id);
  //     updateStudent({ ...student, studentName, schoolId })
  //       .then(() => {
  //         setError("");
  //       })
  //       .catch((ex) => setError(ex.response.data.message));
  //   };

  return schools.map((school) => {
    const filteredStudents = students.filter((student) => {
      return student.schoolId === school.id;
    });
    return (
      <section key={school.id} className="border border-dark">
        {/* <form onSubmit={onSubmit}> */}
        <h2>
          <a href={`#view=school&id=${school.id}`}>{school.schoolName}</a>
        </h2>
        <select
          value={schoolId}
          onChange={(ev) => setSchoolId(ev.target.value)}
        >
          <option value="">-- enroll a student --</option>
          {students.map((student) => {
            return (
              <option value={school.id} key={student.id}>
                {student.studentName}
              </option>
            );
          })}
        </select>
        <ul>
          {filteredStudents.map((student) => {
            return (
              <div key={student.id}>
                <li>
                  <a href={`#view=student&id=${student.id}`}>
                    {student.studentName}
                  </a>
                </li>
                {/* <button onClick={() => unenrollStudent(student)}>Unenroll</button> */}
              </div>
            );
          })}
        </ul>
        {/* </form> */}
      </section>
    );
  });
};

export default Schools;
