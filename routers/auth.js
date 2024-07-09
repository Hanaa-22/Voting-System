const express = require("express");
const User = require("../database/models/user");
const Candidate = require("../database/models/candidate");
const jwtUtil = require("../util/jwt");
const hashUtil = require("../util/hash");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res
      .status(400)
      .json("Invalid Body, username, password, or role is missing");
  }
  try {
    const hashedPassword = await hashUtil.hashPassword(password);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json("Error creating user");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json("User not found");
    }
    const isValidPassword = await hashUtil.comparePassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).json("Invalid password");
    }
    const token = jwtUtil.generateToken(user._id);
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json("Error logging in");
  }
});

router.post("/candidates", isAdmin, async (req, res) => {
  const { name, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "normal") {
      return res
        .status(400)
        .json("Invalid user ID or user is not a normal user");
    }
    const newCandidate = await Candidate.create({
      name,
      user: userId,
    });
    res.status(201).json(newCandidate);
  } catch (error) {
    console.error("Error adding candidate:", error);
    res.status(500).json("Error adding candidate");
  }
});

module.exports = router;
