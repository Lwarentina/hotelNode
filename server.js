/** load library express */ 
const express = require(`express`) 

/** create object that instances of express */ 
const app = express() 

/** define port of server */ 
const PORT = 8000 

/** load library cors */
const cors = require(`cors`) 

/** open CORS policy */ 
app.use(cors()) 

/** define all routes */ 
const userRoute = require(`./routes/user.routes`)
const kamarRoute = require(`./routes/kamar.routes`)
const tipe_kamarRoute = require(`./routes/tipe_kamar.routes`)
const pemesananRoute = require(`./routes/pemesanan.routes`)   

/** define prefix for each route */ 
app.use(`/user`, userRoute) 
app.use(`/kamar`, kamarRoute)
app.use(`/tipe_kamar`, tipe_kamarRoute)  
app.use(`/pemesanan`, pemesananRoute) 

/** run server based on defined port */
app.listen(PORT, () => { 
    console.log(`Server of hotel runs on port 
${PORT}`) 
})