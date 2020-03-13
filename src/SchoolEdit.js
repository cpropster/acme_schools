import React, { useState, useEffect } from "react";

const SchoolEdit = ({ updateSchool, school, deleteSchool }) => {
  const [schoolName, setSchoolName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (school) {
      setSchoolName(school.schoolName);
    }
  }, [school]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    updateSchool({ ...school, schoolName })
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
        <h2>Edit School</h2>
        <div>{error}</div>
        <input
          value={schoolName}
          onChange={(ev) => setSchoolName(ev.target.value)}
        />
        <button>Edit</button>
      </form>
      <button
        type="button"
        onClick={() => {
          window.location.hash = "#";
          return deleteSchool(school);
        }}
      >
        Delete School
      </button>
    </div>
  );
};

export default SchoolEdit;
