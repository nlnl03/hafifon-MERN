const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mahlakotSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    testsNames: {
      type: Array,
      required: true,
    },
    pluga: { type: Schema.Types.ObjectId, ref: "plugot" }, // Reference to the Week it belongs to
  },

  { timestamps: true }
);

module.exports = mongoose.model("Mahlaka", mahlakotSchema);
