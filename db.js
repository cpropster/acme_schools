const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_schools"
);

client.connect();

const sync = async () => {
  const SQL = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    DROP TABLE IF EXISTS students;
    DROP TABLE IF EXISTS schools;
    
    CREATE TABLE schools(
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "schoolName" VARCHAR(100) UNIQUE NOT NULL,
        CHECK(char_length("schoolName") > 0)
    );

    CREATE TABLE students(
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "studentName" VARCHAR(100) UNIQUE NOT NULL,
        "schoolId" UUID REFERENCES schools(id) ON DELETE RESTRICT,
        CHECK(char_length("studentName") > 0)
    );
    `;

  await client.query(SQL);

  const UCSB = await createSchool("UCSB");
  const NYU = await createSchool("NYU");
  const hoffy = await createStudent("Hoffy Dobkins", UCSB.id);
};

const createSchool = async (schoolName) => {
  const SQL = 'INSERT INTO schools("schoolName") VALUES($1) RETURNING *';
  return (await client.query(SQL, [schoolName])).rows[0];
};

const createStudent = async (studentName, schoolId) => {
  const SQL =
    'INSERT INTO students("studentName", "schoolId") VALUES($1, $2) RETURNING *';
  return (await client.query(SQL, [studentName, schoolId])).rows[0];
};

const readSchools = async () => {
  const SQL = `
    SELECT * FROM schools
    `;
  const { rows } = await client.query(SQL);
  return rows;
};

const readStudents = async () => {
  const SQL = `
      SELECT * FROM students
      `;
  const { rows } = await client.query(SQL);
  return rows;
};

const deleteSchools = async (schoolId) => {
  const SQL = `
    DELETE FROM schools WHERE id = $1 RETURNING *;
    `;

  await client.query(SQL, [schoolId]);
};

const deleteStudents = async (studentId) => {
  const SQL = `
      DELETE FROM students WHERE id = $1 RETURNING *;
      `;

  await client.query(SQL, [studentId]);
};

const updateSchool = async ({ schoolName, id }) => {
  const SQL = 'UPDATE schools SET "schoolName" = $1 WHERE id = $2 returning *';
  return (await client.query(SQL, [schoolName, id])).rows[0];
};

const updateStudent = async ({ id, studentName, schoolId }) => {
  const SQL =
    'UPDATE students SET "schoolId" = $1, "studentName" = $2 WHERE id = $3 returning *';
  return (await client.query(SQL, [schoolId, studentName, id])).rows[0];
  //order matters
};

module.exports = {
  createSchool,
  createStudent,
  readSchools,
  readStudents,
  deleteSchools,
  deleteStudents,
  updateSchool,
  updateStudent,
  sync,
};
