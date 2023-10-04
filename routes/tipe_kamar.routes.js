/** load library express */ 
const express = require(`express`) 

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */ 
app.use(express.json())

/** load tipe_kamar's controller */ 
const tipe_kamarController = require(`../controllers/tipe_kamar.controller`)

/** create route to get data with method "GET" */ 
app.get("/", tipe_kamarController.getAlltipe_kamar)

/** create route to add new tipe_kamar using method "POST" */ 
app.post("/", tipe_kamarController.addtipe_kamar)

/** create route to find tipe_kamar * using method "POST" and path "find" */ 
app.post("/find", tipe_kamarController.findtipe_kamar)

/** create route to update tipe_kamar * using method "PUT" and define parameter for "id" */ 
app.put("/:id", tipe_kamarController.updatetipe_kamar)

/** create route to delete tipe_kamar * using method "DELETE" and define parameter for "id" */ 
app.delete("/:id", tipe_kamarController.deletetipe_kamar)

/** export app in order to load in another file */ 
module.exports = app