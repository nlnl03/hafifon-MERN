const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const plugotSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Pluga", plugotSchema);
