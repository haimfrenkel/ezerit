const express = require('express');
const uniformContoller = require('./uniformContoller.js');
const userController = require('./userController.js')

var uniformRoutes = express.Router();

uniformRoutes.post("/create", uniformContoller.create)
uniformRoutes.put("/update/:ID", uniformContoller.update)
uniformRoutes.get("/getOne/:ID", uniformContoller.getOne)
uniformRoutes.get("/getAvailable/:type", uniformContoller.getAvailableUniforms)
uniformRoutes.get("/getAll", uniformContoller.getAll)
uniformRoutes.get("/getObj/:ID", uniformContoller.getObj)


module.exports = uniformRoutes;