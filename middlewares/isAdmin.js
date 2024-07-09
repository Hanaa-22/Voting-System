const User = require("../database/models/user");
const jwtUtil = require("../util/jwt");

async function isAdmin(req, res, next) {
  const token = req.headers["authorization"];
  const data = jwtUtil.verifyToken(token);
  if (!data) {
    res.status(401).json("Your login is invalid");
    return;
  }
  const id = data.id;
  const user = await User.findById(id);
  if (!user || user.role !== "admin") {
    res.status(403).json("Unauthorized, admin access required");
    return;
  }
  req.user = user;
  next();
}

module.exports = isAdmin;
