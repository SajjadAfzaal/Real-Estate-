const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser
      .save()
      .then(() =>
        res.status(201).json({ message: "User created successfully" })
      )
      .catch((error) =>
        res
          .status(500)
          .json({ message: "Error creating user", error: error.message })
      );
  }
};
module.exports = { signup };
