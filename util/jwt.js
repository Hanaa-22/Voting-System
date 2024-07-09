const jwt = require("jsonwebtoken");

function generateToken(id) {
    const token = jwt.sign( {id,},
    process.env.JWT_SECRET, 
    { expiresIn: "360000s", }
    );
    return token;
}

function verifyToken(token) {
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified data:", data);
        return data;
    } catch (error) {
        console.error("Token Invalid:", error); 
        return null;
    }
}

module.exports = { generateToken, verifyToken,};
