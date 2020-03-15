import React from "react";

const UnenrolledStudents = ({ schools, students }) => {
  return schools.map((school) => {
    const filteredStudents = students.filter((student) => {
      return student.schoolId === school.id;
    });
    if (school.schoolName === "UnEnrolled") {
      return (
        <section key={school.id} className="border border-dark">
          <h2>Unenrolled Students</h2>
          <ul>
            {filteredStudents.map((student) => {
              return (
                <div key={student.id}>
                  <li>
                    <a href={`#view=student&id=${student.id}`}>
                      {student.studentName}
                    </a>
                  </li>
                </div>
              );
            })}
          </ul>
        </section>
      );
    }
  });
};

export default UnenrolledStudents;
