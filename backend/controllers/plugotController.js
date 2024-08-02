const Pluga = require("../modules/plugotModel");
const mongoose = require("mongoose");

//get all
const getPlugot = async (req, res) => {
  const plugot = await Pluga.find({}).sort({ createdAt: 1 });

  res.status(200).json(plugot);
};

//get a single
const getPluga = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const plugot = await Pluga.findById(id);

  if (!plugot) {
    return res.status(404).json({ error: "no such workout" });
  }

  res.status(200).json(plugot);
};

//create new
const createPluga = async (req, res) => {
  const { Title, color } = req.body;

  //add doc to db
  try {
    const plugot = await Pluga.create({ Title, color });
    res.status(200).json(plugot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete
const deletePluga = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const plugot = await Pluga.findOneAndDelete({ _id: id });

  if (!plugot) {
    return res.status(400).json({ error: "no such workout" });
  }

  res.status(200).json(plugot);
};

//update
const updatePluga = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const plugot = await Pluga.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!plugot) {
    return res.status(400).json({ error: "no such workout2" });
  }

  res.status(200).json(plugot);
};

module.exports = {
  getPlugot,
  getPluga,
  createPluga,
  deletePluga,
  updatePluga,
};
