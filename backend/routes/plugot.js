const express = require("express");
const {
  getPlugot,
  getPluga,
  createPluga,
  deletePluga,
  updatePluga,
} = require("../controllers/plugotController");
const router = express.Router();

//get all workouts
router.get("/", getPlugot);

//get a single workout
router.get("/:id", getPluga);

//POST a new workout

router.post("/", createPluga);

//DELETE a workout

router.delete("/:id", deletePluga);

//UPDATE a workout

router.patch("/:id", updatePluga);

module.exports = router;
