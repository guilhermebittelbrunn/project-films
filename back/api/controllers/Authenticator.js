const jwt = require('jsonwebtoken');
const colors = require('colors');

function authenticate(req, res, next) {
    const token = req.header('authorization-token', jwt);
    const secret = process.env.JWT_TOKEN_SECRET;
    try {
        console.log(token, secret);
        const isTokenExist = jwt.verify(JSON.parse(token), secret);
        if (isTokenExist) {
            return next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send(error);
    }
}

module.exports = authenticate;
