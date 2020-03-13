const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");

app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/schools", async (req, res, next) => {
  try {
    const data = await db.readSchools();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

app.get("/api/students", async (req, res, next) => {
  try {
    const data = await db.readStudents();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

app.post("/api/schools", async (req, res, next) => {
  try {
    const { schoolName } = req.body;
    const school = await db.createSchool(schoolName);
    res.send(school);
  } catch (error) {
    next(error);
  }
});

app.post("/api/students", async (req, res, next) => {
  try {
    const { studentName, schoolId } = req.body;
    const student = await db.createStudent(studentName, schoolId);
    res.send(student);
  } catch (error) {
    next(error);
  }
});

//figured the .then might fix error handling, didnt work
app.delete("/api/schools/:id", (req, res, next) => {
  db.deleteSchools(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete("/api/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.deleteStudents(id);
    res.sendStatus(204);
  } catch (next) {
    next(next);
  }
});

app.put("/api/schools/:id", (req, res, next) => {
  db.updateSchool(req.body)
    .then((school) => res.send(school))
    .catch(next);
});

app.put("/api/students/:id", (req, res, next) => {
  console.log("im in the server", req.body);
  db.updateStudent(req.body)
    .then((student) => res.send(student))
    .catch(next);
});

app.use((req, res, next) => {
  next({
    status: 404,
    message: `Page not found for ${req.method} ${req.url}`,
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message || JSON.stringify(err),
  });
});

const port = process.env.PORT || 3000;

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
