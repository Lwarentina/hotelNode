/** load library express */ 
const express = require(`express`) 

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */ 
app.use(express.json())

/** load detail_pemesanan's controller */ 
const detail_pemesananController = require(`../controllers/detail_pemesanan.controller`)

/** create route to get data with method "GET" */ 
app.get("/", detail_pemesananController.getAlldetail_pemesanan)

/** create route to add new detail_pemesanan using method "POST" */ 
app.post("/", detail_pemesananController.adddetail_pemesanan)

/** create route to find detail_pemesanan * using method "POST" and path "find" */ 
app.post("/find", detail_pemesananController.finddetail_pemesanan)

/** create route to update detail_pemesanan * using method "PUT" and define parameter for "id" */ 
app.put("/:id", detail_pemesananController.updatedetail_pemesanan)

/** create route to delete detail_pemesanan * using method "DELETE" and define parameter for "id" */ 
app.delete("/:id", detail_pemesananController.deletedetail_pemesanan)

/** export app in order to load in another file */ 
module.exports = app