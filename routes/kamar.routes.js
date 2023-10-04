/** load library express */ 
const express = require(`express`) 

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */ 
app.use(express.json())

/** load kamar's controller */ 
const kamarController = require(`../controllers/kamar.controller`)

/** create route to get data with method "GET" */ 
app.get("/", kamarController.getAllkamar)

/** create route to add new kamar using method "POST" */ 
app.post("/", kamarController.addkamar)

/** create route to find kamar * using method "POST" and path "find" */ 
app.post("/find", kamarController.findkamar)

/** create route to update kamar * using method "PUT" and define parameter for "id" */ 
app.put("/:id", kamarController.updatekamar)

/** create route to delete kamar * using method "DELETE" and define parameter for "id" */ 
app.delete("/:id", kamarController.deletekamar)

/** export app in order to load in another file */ 
module.exports = app