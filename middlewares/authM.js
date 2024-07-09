const userModel = require("../database/models/user");
const jwtUtil = require("../util/jwt");

async function authMiddleware(req, res, next) {
    const token = req.headers["Authorization"];
    const data = jwtUtil.verifyToken(token);
    if (!data) {
        res.status(401).json("Your login is invalid");
        return;
    }
    const id = data.id;
    const user = await userModel.findOne({
        _id: id,
    });
    if (!user) {
        res.json("Your token is invalid");
        return;
    }
    req.user = user;
    next();
}

module.exports = authMiddleware;
