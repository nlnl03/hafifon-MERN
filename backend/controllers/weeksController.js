const Week = require("../modules/weeksModel");
const mongoose = require("mongoose");

//get all
const getWeeks = async (req, res) => {
  const mahlakot = await Week.find({}).sort({ createdAt: 1 });

  res.status(200).json(mahlakot);
};

//get a single
const getWeek = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such week" });
  }
  const week = await Week.findById(id);

  if (!week) {
    return res.status(404).json({ error: "no such week" });
  }

  res.status(200).json(week);
};

//create new
const createWeek = async (req, res) => {
  const { number, lessons } = req.body;

  //add doc to db
  try {
    const week = await Week.create({ number, lessons: [] });
    res.status(200).json(week);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete
const deleteWeek = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such week" });
  }
  const week = await Week.findOneAndDelete({ _id: id });

  if (!week) {
    return res.status(400).json({ error: "no such week" });
  }

  res.status(200).json(week);
};

//update
const updateWeek = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such week" });
  }

  const week = await Week.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!week) {
    return res.status(400).json({ error: "no such week" });
  }

  res.status(200).json(week);
};

module.exports = {
  getWeeks,
  getWeek,
  createWeek,
  deleteWeek,
  updateWeek,
};
