const express = require("express");
const router = express.Router();
const {
  getWeekWithLessonsAndPractices,
} = require("../controllers/allMaterialsController");

// Route to get a week with its lessons and practices
router.get("/", getWeekWithLessonsAndPractices);

module.exports = router;
