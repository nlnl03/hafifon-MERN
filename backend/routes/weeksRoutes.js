const express = require("express");
const {
  getWeeks,
  getWeek,
  createWeek,
  deleteWeek,
  updateWeek,
} = require("../controllers/weeksController");
const router = express.Router();

//get all workouts
router.get("/", getWeeks);

//get a single workout
router.get("/:id", getWeek);

//POST a new workout

router.post("/", createWeek);

//DELETE a workout

router.delete("/:id", deleteWeek);

//UPDATE a workout

router.patch("/:id", updateWeek);

module.exports = router;
