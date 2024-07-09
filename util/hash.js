const bcrypt = require("bcrypt");

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}

async function comparePassword(password, hash) {
    let isValid = await bcrypt.compare(password, hash);
    return isValid;
}

module.exports = { hashPassword, comparePassword, };
