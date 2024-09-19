const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  assignRole,
} = require("../controllers/usersController");

const { verifyAdmin } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin routes
router.get("/", verifyAdmin, getAllUsers); // Only admin can view all users
router.get("/:id", verifyAdmin, getUserById); // Only admin can view specific user
router.put("/:id", verifyAdmin, updateUser); // Only admin can update user details
router.delete("/:id", verifyAdmin, deleteUser); // Only admin can delete user
router.post("/assign-role", verifyAdmin, assignRole); // Only admin can assign roles

// Database connection and server start...
module.exports = router;
