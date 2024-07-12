const express = require("express");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const transactionRoutes = require("./transaction.routes");
const reportRoutes = require("./report.routes");
const goalRoutes = require("./savinggoal.routes");

const router = express.Router();


router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/goals",goalRoutes);
router.use("/transactions", transactionRoutes);
router.use("/reports",reportRoutes);


module.exports = router;
