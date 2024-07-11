const express = require("express");
const { create, getAll, get, getAllBetweenDates, destory, update } = require("../controllers/transaction.controller");
const authenticator = require("../middlewares/authentication");
const { transactionCreateValidator } = require("../validators/validators");




const router = express.Router();


router.post('/', authenticator, transactionCreateValidator, create);
router.delete('/:id', authenticator, destory);
router.get('/betweendates', authenticator, getAllBetweenDates);
router.patch('/:id', authenticator, update);
router.get('/:id', authenticator, get);
router.get('/', authenticator, getAll);


module.exports = router;