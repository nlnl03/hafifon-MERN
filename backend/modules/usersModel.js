const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const plugotSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "rashats"],
      required: true,
    },
    permissions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExamsTests" }],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", plugotSchema);
