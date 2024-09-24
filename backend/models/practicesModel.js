const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const practicesSchema = new Schema({
  Title: { type: String, required: true },
  lesson: { type: Schema.Types.ObjectId, ref: "lessons" }, // Reference to the Lesson it belongs to
  questions: [
    {
      question: String,
      queType: String,
      options: Array,
      correctAnswer: String,
    },
  ],
});

const Quiz = mongoose.model("practices", practicesSchema);

module.exports = Quiz;
