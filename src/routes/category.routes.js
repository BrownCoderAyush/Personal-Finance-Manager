const express = require("express");
const { create, destory, get, getAll } = require("../controllers/category.controller");
const authenticator = require("../middlewares/authentication");




const router = express.Router();


router.post('/', authenticator, create);
router.delete('/:id', authenticator, destory);
router.get('/:id', authenticator, get);
router.get('/', authenticator, getAll);


module.exports = router;