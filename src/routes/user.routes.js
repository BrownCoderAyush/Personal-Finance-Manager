const express = require("express");
const { create, signIn } = require("../controllers/user.controller");
const { userSignUpValidator, userLogInValidator } = require("../validators/user.validator");




const router = express.Router();


router.post('/signUp',userSignUpValidator,create);
router.get('/signIn',userLogInValidator,signIn);

module.exports = router;