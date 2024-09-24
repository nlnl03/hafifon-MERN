const Lesson = require("../models/lessonsModel");
const Practice = require("../models/practicesModel");
const mongoose = require("mongoose");

//get all
const getPractices = async (req, res) => {
  const practices = await Practice.find({}).sort({ createdAt: 1 });

  res.status(200).json(practices);
};

//get a single
const getPractice = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such practice" });
    }
    const practice = await Practice.findById(id);
    if (!practice) {
      return res.status(404).json({ error: "no such practice" });
    }
    const quizWithoutAnswers = practice.toObject(); // Convert to plain object
    quizWithoutAnswers.questions.forEach((q) => delete q.correctAnswer); // Remove correct answers

    res.status(200).json(quizWithoutAnswers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//create new
const createPractice = async (req, res) => {
  const { lessonId } = req.params;
  const { Title, questions } = req.body;

  //add doc to db
  try {
    const practice = await Practice.create({
      Title,
      lesson: lessonId,
      questions,
    });
    await Lesson.findByIdAndUpdate(
      lessonId,
      { $push: { practices: practice._id } },
      { new: true }
    );

    res.status(201).json(practice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete
const deletePractice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such practice" });
  }
  const practice = await Practice.findOneAndDelete({ _id: id });

  if (!practice) {
    return res.status(400).json({ error: "no such practice" });
  }

  res.status(200).json(practice);
};

//update
const updatePractice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such practice" });
  }

  const practice = await Practice.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!practice) {
    return res.status(400).json({ error: "no such practice" });
  }

  res.status(200).json(practice);
};

// Submit quiz answers and return result
const submitPractice = async (req, res) => {
  const { answers } = req.body;
  const { id } = req.params;

  try {
    const practice = await Practice.findById(id);

    // Compare user answers with correct answers
    const result = practice.questions.map((q) => ({
      question: q.question,
      correct: q.correctAnswer === answers[q._id], // Match answers without sending correctAnswer
    }));

    // Optionally, calculate score
    const score = result.filter((r) => r.correct).length;

    res.json({ result, score });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPractices,
  getPractice,
  createPractice,
  deletePractice,
  updatePractice,
  submitPractice,
};
