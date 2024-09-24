const mongoose = require("mongoose");

const examTestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["exam", "test"], required: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who have access
  },
  { timestamps: true }
);

// Create a model from the schema
module.exports = mongoose.model("ExamsTests", examTestSchema);
