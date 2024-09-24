const express = require("express");
const { User } = require("../../models/usersModel");

const router = express.Router();
const bcrypt = require("bcryptjs");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "האימייל או הסיסמה שהזנת לא נכונים" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "האימייל או הסיסמה שהזנת לא נכונים" });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ data: token, message: "התחברת בהצלחה !" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email address"),
    password: Joi.string().required().label("password"),
  });
  return schema.validate(data);
};

module.exports = router;
