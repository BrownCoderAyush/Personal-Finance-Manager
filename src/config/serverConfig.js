const dotenv = require("dotenv");
const bcrypt=require("bcrypt");
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    SALT:bcrypt.genSaltSync(10),
    JWT_KEY:process.env.JWT_KEY
}