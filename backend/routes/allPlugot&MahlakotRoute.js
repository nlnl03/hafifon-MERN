const express = require("express");
const router = express.Router();
const {
  getPlugotWithMahlakot,
} = require("../controllers/allPlugot&MahlakotController");

router.get("/", getPlugotWithMahlakot);

module.exports = router;
