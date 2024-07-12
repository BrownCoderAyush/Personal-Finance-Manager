const express = require("express");
const { create,progress } = require("../controllers/savinggoal.controller");
const authenticator = require("../middlewares/authentication");
const { savingGoalCreateValidator } = require("../validators/validators");




const router = express.Router();


router.post('/', authenticator,savingGoalCreateValidator, create);
// router.delete('/:id', authenticator, destory);
// router.get('/:id', authenticator, get);
// router.get('/', authenticator, getAll);

router.get('/progress', authenticator, progress);


module.exports = router;