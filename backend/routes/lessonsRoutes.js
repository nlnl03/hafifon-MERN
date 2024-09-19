const express = require("express");
const {
  getLessons,
  getLesson,
  createLesson,
  deleteLesson,
  updateLesson,
} = require("../controllers/lessonsController");
const router = express.Router();

//get all workouts
router.get("/", getLessons);

//get a single workout
router.get("/:id", getLesson);

//POST a new workout

router.post("/:weekId", createLesson);

//DELETE a workout

router.delete("/:id", deleteLesson);

//UPDATE a workout

router.patch("/:id", updateLesson);

module.exports = router;
