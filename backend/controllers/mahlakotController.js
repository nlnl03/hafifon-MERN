const Plugot = require("../models/plugotModel");
const Mahlaka = require("../models/mahlakotModel");
const mongoose = require("mongoose");

//get all
const getMahlakot = async (req, res) => {
  const mahlakot = await Mahlaka.find({}).sort({ createdAt: 1 });

  res.status(200).json(mahlakot);
};

//get a single
const getMahlaka = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const mahlaka = await Mahlaka.findById(id);

  if (!mahlaka) {
    return res.status(404).json({ error: "no such workout" });
  }

  res.status(200).json(mahlaka);
};

//create new
const createMahlaka = async (req, res) => {
  const { Title, testsNames, plugaName } = req.body;
  const { plugaId } = req.params;

  //add doc to db
  try {
    const mahlaka = await Mahlaka.create({
      Title,
      testsNames,
      pluga: plugaId,
    });

    await Plugot.findByIdAndUpdate(
      plugaId,
      { $push: { mahlakot: mahlaka._id } }, // Push the new lesson's ID into the lessons array
      { new: true }
    );

    res.status(201).json(mahlaka);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete
const deleteMahlaka = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const mahlaka = await Mahlaka.findOneAndDelete({ _id: id });

  if (!mahlaka) {
    return res.status(400).json({ error: "no such workout" });
  }

  res.status(200).json(mahlaka);
};

//update
const updateMahlaka = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const mahlaka = await Mahlaka.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!mahlaka) {
    return res.status(400).json({ error: "no such workout2" });
  }

  res.status(200).json(mahlaka);
};

module.exports = {
  getMahlakot,
  getMahlaka,
  createMahlaka,
  deleteMahlaka,
  updateMahlaka,
};
