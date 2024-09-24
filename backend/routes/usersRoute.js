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

const auth = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);

// Admin routes
router.get("/", auth(["admin"]), getAllUsers); // Only admin can view all users
router.get("/:id", auth(["admin"]), getUserById); // Only admin can view specific user
router.put("/:id", auth(["admin"]), updateUser); // Only admin can update user details
router.delete("/:id", auth(["admin"]), deleteUser); // Only admin can delete user
router.post("/assign-role", auth(["admin"]), assignRole); // Only admin can assign roles

// Database connection and server start...
module.exports = router;
