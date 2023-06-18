const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../Model/UsersModel");
require("dotenv").config();

// ================================REGISTER USER==============================
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password ) {
    res.status(400).send({ message: "Please add all fields" });
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    res.status(400).send({ message: "Please enter a valid email address" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send({ message: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ================================CREATE USER REGISTER==============================
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    

  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).send({ message: "Invalid user data" });
  }
  // res.status(400).send({ message: "succesfully registered" });
});

// ================================LOGIN USER==============================

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      errors: [{ user: "not found" }],
    });
  }

  if ( !email || !password ) {
    res.status(400).send({ message: "Please add all fields" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [{ password: "Incorrect Password" }]
    });
  }

  res.json({
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// ================================LOGOUT==============================
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out" });
});

// ================================DELETE USER==============================
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// ================================GET ME==============================
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});
// ================================GET ALL==============================

const getAll = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.json({ message: "ALL USER data display", user });
});

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  logoutUser,
  getMe,
  getAll,
};
