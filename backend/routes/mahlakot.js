const express = require("express");
const {
  getMahlakot,
  getMahlaka,
  createMahlaka,
  deleteMahlaka,
  updateMahlaka,
} = require("../controllers/mahlakotController");
const router = express.Router();

//get all workouts
router.get("/", getMahlakot);

//get a single workout
router.get("/:id", getMahlaka);

//POST a new workout

router.post("/:plugaId", createMahlaka);

//DELETE a workout

router.delete("/:id", deleteMahlaka);

//UPDATE a workout

router.patch("/:id", updateMahlaka);

module.exports = router;
