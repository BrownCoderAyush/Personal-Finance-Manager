const express = require("express");
const { getReport } = require("../controllers/report.controller");
const authenticator = require("../middlewares/authentication");


const router = express.Router();


router.get('/', authenticator, getReport);



module.exports = router;