import React, { useState } from "react";

const SchoolForm = ({ createSchool }) => {
  const [schoolName, setSchoolName] = useState("");
  const onSubmit = (ev) => {
    ev.preventDefault();
    createSchool({ schoolName });
    setSchoolName("");
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <h2>Create School</h2>
        <input
          value={schoolName}
          onChange={(ev) => setSchoolName(ev.target.value)}
        />
        <button>Create School</button>
      </form>
    </section>
  );
};

export default SchoolForm;
