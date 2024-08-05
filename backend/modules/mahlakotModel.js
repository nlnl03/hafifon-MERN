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
    plugaName: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Mahlaka", mahlakotSchema);
