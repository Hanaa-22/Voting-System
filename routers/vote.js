const express = require("express");
const Vote = require("../database/models/vote");
const authMiddleware = require("../middlewares/authM");

const router = express.Router();

router.use(authMiddleware);

router.post("/vote", async (req, res) => {
  const { candidateId } = req.body;
  if (!candidateId) {
    return res.status(400).json("Candidate ID is required");
  }
  try {
    const existingVote = await Vote.findOne({
      user: req.user._id,
      candidate: candidateId,
    });
    if (existingVote) {
      return res.status(400).json("You have already voted for this candidate");
    }
    const newVote = await Vote.create({
      user: req.user._id,
      candidate: candidateId,
    });
    res.status(201).json(newVote);
  } catch (error) {
    console.error("Error adding vote:", error);
    res.status(500).json("Error adding vote");
  }
});

module.exports = router;
