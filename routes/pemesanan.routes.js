/** load library express */ 
const express = require(`express`) 

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */ 
app.use(express.json())

/** load pemesanan's controller */ 
const pemesananController = require(`../controllers/pemesanan.controller`)

/** create route to get data with method "GET" */ 
app.get("/", pemesananController.getAllpemesanan)

/** create route to add new pemesanan using method "POST" */ 
app.post("/", pemesananController.addpemesanan)

/** create route to find pemesanan * using method "POST" and path "find" */ 
app.post("/find", pemesananController.findpemesanan)

/** create route to update pemesanan * using method "PUT" and define parameter for "id" */ 
app.put("/:id", pemesananController.updatepemesanan)

/** create route to delete pemesanan * using method "DELETE" and define parameter for "id" */ 
app.delete("/:id", pemesananController.deletepemesanan)

/** export app in order to load in another file */ 
module.exports = app