const ExamTest = require("../modules/examsTestsModel");
const User = require("../modules/usersModel");

// Get all exams/tests
const getExamsTests = async (req, res) => {
  try {
    const examsTests = await ExamTest.find();
    res.status(200).json(examsTests);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a specific exam/test
const getExamTestById = async (req, res) => {
  try {
    const examTest = await ExamTest.findById(req.params.id);
    if (!examTest) {
      return res.status(404).json({ message: "Exam/Test not found" });
    }
    res.status(200).json(examTest);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new exam/test
const createExamTest = async (req, res) => {
  try {
    const newExamTest = new ExamTest(req.body);
    const savedExamTest = await newExamTest.save();
    res.status(201).json(savedExamTest);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an exam/test
const updateExamTest = async (req, res) => {
  try {
    const updatedExamTest = await ExamTest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExamTest) {
      return res.status(404).json({ message: "Exam/Test not found" });
    }
    res.status(200).json(updatedExamTest);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete an exam/test
const deleteExamTest = async (req, res) => {
  try {
    const deletedExamTest = await ExamTest.findByIdAndDelete(req.params.id);
    if (!deletedExamTest) {
      return res.status(404).json({ message: "Exam/Test not found" });
    }
    res.status(200).json({ message: "Exam/Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Grant permission to a user for an exam/test
const grantPermission = async (req, res) => {
  try {
    const { userId, examTestId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.permissions.push(examTestId);
    await user.save();
    res.status(200).json({ message: "Permission granted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getExamsTests,
  getExamTestById,
  createExamTest,
  updateExamTest,
  deleteExamTest,
  grantPermission,
};
