const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ["user", "rashatz", "admin"],
      default: ["user"],
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "1d",
  });
  return token;
};

const User = mongoose.model("Users", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required().label("Full Name"),
    email: Joi.string().email().required().label("Email address"),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
