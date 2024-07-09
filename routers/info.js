const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authM");

router.use(authMiddleware);

router.get("/me", (req, res) => {
  res.json(req.user);
});

module.exports = router;
