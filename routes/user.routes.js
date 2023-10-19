const express = require('express')
var body = require("body-parser");

const app = express()

app.use(express.json())

const userController = require('../controllers/user.controller')
const auth = require("../auth/auth");
const { checkRole } = require("../middleware/checkRole");

app.post("/login", userController.login)
app.get("/getAll", auth.authVerify, checkRole(["admin","resepsionis"]), userController.getAlluser);
app.get("/findOne/:id", auth.authVerify, checkRole(["admin","resepsionis"]), userController.finduser)
app.post("/", userController.adduser)
app.post("/find", userController.finduser)
app.put("/:id", userController.updateuser)
app.delete("/:id", auth.authVerify, checkRole(["admin"]), userController.deleteuser)
module.exports = app