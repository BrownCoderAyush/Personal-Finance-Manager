const jwt = require('jsonwebtoken')
const secret = process.env.JWT_KEY;

class AuthService {

    static verifyToken(jwtToken) {
        return jwt.verify(jwtToken, secret);
    }

    static createToken(claims) {
        return jwt.sign(claims, secret);
    }
}

module.exports = AuthService;