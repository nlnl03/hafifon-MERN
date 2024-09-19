const Week = require("../modules/weeksModel");
const Lesson = require("../modules/lessonsModel");
const mongoose = require("mongoose");

//get all
const getLessons = async (req, res) => {
  const lessons = await Lesson.find({}).sort({ createdAt: 1 });

  res.status(200).json(lessons);
};

//get a single
const getLesson = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Lesson" });
  }
  const lesson = await Lesson.findById(id);

  if (!lesson) {
    return res.status(404).json({ error: "no such Lesson" });
  }

  res.status(200).json(Lesson);
};

//create new
const createLesson = async (req, res) => {
  const { Title, Img, file } = req.body;
  const { weekId } = req.params;

  //add doc to db
  try {
    const lesson = await Lesson.create({
      Title,
      week: weekId,
      practices: [],
      Img,
      file,
    });

    await Week.findByIdAndUpdate(
      weekId,
      { $push: { lessons: lesson._id } }, // Push the new lesson's ID into the lessons array
      { new: true }
    );

    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete
const deleteLesson = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Lesson" });
  }
  const lesson = await Lesson.findOneAndDelete({ _id: id });

  if (!lesson) {
    return res.status(400).json({ error: "no such Lesson" });
  }

  res.status(200).json(lesson);
};

//update
const updateLesson = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such Lesson" });
  }

  const lesson = await Lesson.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!lesson) {
    return res.status(400).json({ error: "no such Lesson" });
  }

  res.status(200).json(lesson);
};

module.exports = {
  getLessons,
  getLesson,
  createLesson,
  deleteLesson,
  updateLesson,
};
