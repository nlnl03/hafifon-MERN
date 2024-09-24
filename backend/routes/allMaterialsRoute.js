const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getWeekWithLessonsAndPractices,
} = require("../controllers/allMaterialsController");

// Route to get a week with its lessons and practices
router.get("/", auth(["admin"]), getWeekWithLessonsAndPractices);

module.exports = router;
