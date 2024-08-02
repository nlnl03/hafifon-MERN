require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mahlakotRoutes = require("./routes/mahlakot");
const plugotRoutes = require("./routes/plugot");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/plugot", plugotRoutes);

app.use("/api/mahlakot", mahlakotRoutes);

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
