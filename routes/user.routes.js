/** load library express */ 
const express = require(`express`) 

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */ 
app.use(express.json())

/** load user's controller */ 
const userController = require(`../controllers/user.controller`)

/** create route to get data with method "GET" */ 
app.get("/", userController.getAlluser)

/** create route to add new user using method "POST" */ 
app.post("/", userController.adduser)

/** create route to find user * using method "POST" and path "find" */ 
app.post("/find", userController.finduser)

/** create route to update user * using method "PUT" and define parameter for "id" */ 
app.put("/:id", userController.updateuser)

/** create route to delete user * using method "DELETE" and define parameter for "id" */ 
app.delete("/:id", userController.deleteuser)

/** export app in order to load in another file */ 
module.exports = app