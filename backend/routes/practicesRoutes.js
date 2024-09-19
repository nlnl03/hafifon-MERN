const express = require("express");
const {
  getPractices,
  getPractice,
  createPractice,
  deletePractice,
  updatePractice,
  submitPractice,
} = require("../controllers/practicesController");
const router = express.Router();

//get all workouts
router.get("/", getPractices);

//get a single workout
router.get("/:id", getPractice);

//POST a new workout

router.post("/:lessonId", createPractice);

//DELETE a workout

router.delete("/:id", deletePractice);

//UPDATE a workout

router.patch("/:id", updatePractice);

//submit pracice and compare answers
router.post("/:id/submit", submitPractice);

module.exports = router;
