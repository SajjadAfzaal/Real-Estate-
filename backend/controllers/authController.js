const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      // res
      // .status(500)
      // .json({ message: "Error creating user", error: error.message })
      // next(errorHandler(590, "Error from utils error function"))
      next(error);
    }
  }
};
// module.exports = { signup };

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    } else {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      // Add logic for successful signin here
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          message: "Signin successful",
          token,
          user: { id: user._id, username: user.username, email: user.email },
        });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin };
