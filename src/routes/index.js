const express = require("express");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const transactionRoutes = require("./transaction.routes");
const router = express.Router();


router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/transactions", transactionRoutes);


module.exports = router;
