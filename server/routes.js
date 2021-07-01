const express = require('express');
const userController = require('./userController.js')

var userRoutes = express.Router();

userRoutes.post("/create", userController.create)
userRoutes.put("/update/:ID", userController.update)
userRoutes.put("/updateIncome/:ID", userController.updateIncome)
userRoutes.get("/getOne/:ID", userController.getOne)
userRoutes.get("/getAll", userController.getAll)
userRoutes.get("/totalIncome", userController.totalIncome)
userRoutes.get("/getName/:ID", userController.getNameAndID)



module.exports = userRoutes;