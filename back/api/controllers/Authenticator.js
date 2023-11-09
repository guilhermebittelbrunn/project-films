const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.header('authorization-token', jwt);
    const secret = process.env.JWT_TOKEN_SECRET;
    try {
        const isTokenExist = jwt.verify(JSON.parse(token), secret);
        if (isTokenExist) {
            req.idUser = JSON.parse(atob(token.split('.')[1])).id;
            return next();
        }
    } catch (error) {
        // console.log(error);
        return res.status(401).send({ msg: 'error authenticating', error });
    }
}

module.exports = authenticate;
