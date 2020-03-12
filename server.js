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
    const { studentName } = req.body;
    const student = await db.createStudent(studentName);
    res.send(student);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/schools/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.deleteSchools(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.deleteStudents(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
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
