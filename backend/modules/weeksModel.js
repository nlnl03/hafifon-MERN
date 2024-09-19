const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const weeksSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    lessons: [{ type: Schema.Types.ObjectId, ref: "lessons" }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("weeks", weeksSchema);
