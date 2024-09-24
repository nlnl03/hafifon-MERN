const express = require("express");
const router = express.Router();

const {
  getExamsTests,
  getExamTestById,
  createExamTest,
  updateExamTest,
  deleteExamTest,
  grantPermission,
} = require("../controllers/examsTestsController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth(["admin"]), getExamsTests);
router.get("/:id", auth(["admin"]), getExamTestById);
router.post("/", auth(["admin"]), createExamTest); // Only admin can create
router.put("/:id", auth(["admin"]), updateExamTest); // Only admin can update
router.delete("/:id", auth(["admin"]), deleteExamTest); // Only admin can delete
router.post("/grant-permission", auth(["admin"]), grantPermission); // Only admin can grant permissions

module.exports = router;
