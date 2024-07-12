const { User } = require("../models/index");
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require('sequelize');

class UserService {

    async signUp(data) {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: data.email },
                    { username: data.username }
                ]
            },
            raw: true
        });
        if (user) {
            throw new Error("User with this email or username already exist.");
        }
        const response = await User.create(data);
        return response;
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async signIn(email, Plainpassword) {

        // step 1 -> fetch the user using the email 
        const user = await User.findOne({
            where: {
                email: email
            },
            raw: true
        });
        const passwordMatch = this.checkPassword(Plainpassword, user.password);

        // step 2 -> comapre incoming password with stored encrypted Password
        if (!passwordMatch) {
            throw new Error("Password dosen't match.");
        }

        // step 3 -> if password match then create a token and send it to the user 
        const newJwtToken = this.createToken({ email: user.email, id: user.id });
        return newJwtToken;

    }

    async getByUserId(userId) {
        const user = await User.findById(userId, { raw: true });
        return user;
    }
};


module.exports = UserService;