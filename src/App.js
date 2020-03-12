import axios from "axios";
import React from "react";
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

  return (
    <div>
      <h1>
        <a href="#">ACME SCHOOLS</a>
        <ul>
          <li>
            {schools.length} {schools.length === 1 ? "School" : "Schools"}
          </li>
          <li>
            {students.length} {students.length === 1 ? "Student" : "Students"}
          </li>
        </ul>
      </h1>
    </div>
  );
};

export default App;
