require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mahlakotRoutes = require("./routes/mahlakot");
const plugotRoutes = require("./routes/plugot");
const plugotWithMahlakot = require("./routes/allPlugot&MahlakotRoute");
const usersRoutes = require("./routes/usersRoute");
const authRoutes = require("./routes/authentication/auth");
const examsTestsRoutes = require("./routes/examsTestsRoutes");
const weeksRoutes = require("./routes/weeksRoutes");
const lessonsRoutes = require("./routes/lessonsRoutes");
const practicesRoutes = require("./routes/practicesRoutes");
const weekWithLessonsAndPractices = require("./routes/allMaterialsRoute");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes

app.use("/api/users", usersRoutes);
app.use("/api/users/login", authRoutes);

app.use("/api/plugot", plugotRoutes);

app.use("/api/mahlakot", mahlakotRoutes);

app.use("/api/plugotWithMahlakot", plugotWithMahlakot);

app.use("/api/weeks", weeksRoutes);

app.use("/api/lessons", lessonsRoutes);

app.use("/api/practices", practicesRoutes);

app.use("/api/materials", weekWithLessonsAndPractices);

app.use("/api/examsTests", examsTestsRoutes);

//conncet to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connceted to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
