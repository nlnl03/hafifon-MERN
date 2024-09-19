const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lessonsSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    week: { type: Schema.Types.ObjectId, ref: "weeks" }, // Reference to the Week it belongs to
    practices: [{ type: Schema.Types.ObjectId, ref: "practices" }], // Array of references to Practice documents
    Img: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("lessons", lessonsSchema);
