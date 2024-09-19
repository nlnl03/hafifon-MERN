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

const { verifyAdmin } = require("../middleware/authMiddleware"); // Middleware to check if user is admin

router.get("/", verifyAdmin, getExamsTests);
router.get("/:id", verifyAdmin, getExamTestById);
router.post("/", verifyAdmin, createExamTest); // Only admin can create
router.put("/:id", verifyAdmin, updateExamTest); // Only admin can update
router.delete("/:id", verifyAdmin, deleteExamTest); // Only admin can delete
router.post("/grant-permission", verifyAdmin, grantPermission); // Only admin can grant permissions

module.exports = router;
