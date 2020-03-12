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
        "schoolName" VARCHAR(100) NOT NULL,
        CHECK(char_length("schoolName") > 0)
    );

    CREATE TABLE students(
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "studentName" VARCHAR(100) NOT NULL,
        "schoolId" UUID REFERENCES schools(id),
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
      DELETE FROM schools WHERE id = $1 RETURNING *;
      `;

  await client.query(SQL, [studentId]);
};

module.exports = {
  createSchool,
  createStudent,
  readSchools,
  readStudents,
  deleteSchools,
  deleteStudents,
  sync,
};
