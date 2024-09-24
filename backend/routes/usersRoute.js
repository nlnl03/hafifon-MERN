const express = require("express");
const router = express.Router();

const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  assignRole,
} = require("../controllers/usersController");

// const { verifyAdmin } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);

// Admin routes
router.get("/", getAllUsers); // Only admin can view all users
router.get("/:id", getUserById); // Only admin can view specific user
router.put("/:id", updateUser); // Only admin can update user details
router.delete("/:id", deleteUser); // Only admin can delete user
router.post("/assign-role", assignRole); // Only admin can assign roles

// Database connection and server start...
module.exports = router;
