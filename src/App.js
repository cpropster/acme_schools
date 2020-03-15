import axios from "axios";
import React from "react";
import StudentForm from "./StudentForm";
import SchoolForm from "./SchoolForm";
import Schools from "./Schools";
import UnenrolledStudents from "./UnenrolledStudents";
import StudentEdit from "./StudentEdit";
import SchoolEdit from "./SchoolEdit";
import qs from "qs";

const { useState, useEffect } = React;

const App = () => {
  const [error, setError] = useState("");
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);
  const [params, setParams] = useState(qs.parse(window.location.hash.slice(1)));

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setParams(qs.parse(window.location.hash.slice(1)));
    });
  }, []);

  const { view } = params;

  useEffect(() => {
    Promise.all([axios.get("/api/schools"), axios.get("/api/students")])
      .then((responses) => responses.map((response) => response.data))
      .then((results) => {
        setSchools(results[0]);
        setStudents(results[1]);
        setError("");
      })
      .catch((ex) => setError(ex.response.data.message));
  }, []);

  const createSchool = async (school) => {
    try {
      const createdSchool = (await axios.post("/api/schools", school)).data;
      setSchools([...schools, createdSchool]);
      setError("");
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const createStudent = async (student) => {
    try {
      const createdStudent = (await axios.post("/api/students", student)).data;
      setStudents([...students, createdStudent]);
      setError("");
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const deleteSchool = async (schoolToDelete) => {
    try {
      await axios.delete(`/api/schools/${schoolToDelete.id}`);
      setSchools(schools.filter((school) => school.id !== schoolToDelete.id));
      setError("");
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const deleteStudent = async (studentToDelete) => {
    try {
      await axios.delete(`/api/students/${studentToDelete.id}`);
      setStudents(
        students.filter((student) => student.id !== studentToDelete.id)
      );
      setError("");
    } catch (ex) {
      setError(ex.response.data.message);
    }
  };

  const updateSchool = async (school) => {
    const updated = (await axios.put(`/api/schools/${school.id}`, school)).data;
    setSchools(
      schools.map((sch) => {
        return sch.id === updated.id ? updated : sch;
      })
    );
  };

  const updateStudent = async (student) => {
    const updated = (await axios.put(`/api/students/${student.id}`, student))
      .data;
    setStudents(
      students.map((student) => (student.id === updated.id ? updated : student))
    );
  };

  return (
    <div>
      <h1>
        <a href="#">ACME SCHOOLS</a>
        <ul>
          <li>
            {schools.length - 1} {schools.length === 1 ? "School" : "Schools"}
          </li>
          <li>
            {students.length} {students.length === 1 ? "Student" : "Students"}
          </li>
        </ul>
      </h1>
      {view === "student" && (
        <StudentEdit
          student={students.find((student) => student.id === params.id)}
          updateStudent={updateStudent}
          schools={schools}
          deleteStudent={deleteStudent}
        />
      )}
      {view === "school" && (
        <SchoolEdit
          school={schools.find((school) => school.id === params.id)}
          updateSchool={updateSchool}
          deleteSchool={deleteSchool}
        />
      )}
      {!view && (
        <div>
          <SchoolForm createSchool={createSchool} />
          <StudentForm createStudent={createStudent} schools={schools} />
          <UnenrolledStudents schools={schools} students={students} />
          <Schools
            schools={schools}
            students={students}
            student={students.find((student) => student.id === params.id)}
            updateStudent={updateStudent}
            // deleteStudent={deleteStudent}
          />
        </div>
      )}
    </div>
  );
};

export default App;
