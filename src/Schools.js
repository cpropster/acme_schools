import React, { useState } from "react";

const Schools = ({ schools, students, student, updateStudent }) => {
  const [schoolId, setSchoolId] = useState("");

  //onChange we would need to update student along with setting the school id

  return schools.map((school) => {
    const filteredStudents = students.filter((student) => {
      return student.schoolId === school.id;
    });
    return (
      <section key={school.id} className="border border-dark">
        <h2>
          <a href={`#view=school&id=${school.id}`}>{school.schoolName}</a>
        </h2>
        <select
          value={school.id}
          onChange={(ev) => setSchoolId(ev.target.value)} //need to change this
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
        <ul>
          {filteredStudents.map((student) => {
            return <li key={student.id}>{student.studentName}</li>;
          })}
        </ul>
      </section>
    );
  });
};

export default Schools;
