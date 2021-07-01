const port = 5000;
const experssFunction = require("express");
var app = experssFunction();
const mongoose = require("mongoose");
const Token = require('./tokenUser.js');
const userController = require('./userController.js')
var userRuotes = require('./routes');
const uniformRoutes = require("./uniformRoutes.js");


const dbPath = "mongodb://127.0.0.1:27017/ezeritDB";

mongoose.connect(dbPath);


mongoose.connection.on("error", function () { });


app.use(require('cors')());
app.use(experssFunction.json());

app.use("/api/users", userRuotes);
app.use("/api/uniform", uniformRoutes)

app.listen(port, function () {
    console.log("server is up in: " + port);
})