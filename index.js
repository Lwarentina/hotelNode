const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors") 
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get("/hotel", (req,res) => {
    let response = {
        message: "welcome to hotel",
        method: req.method, code: res.statusCode
    }

    res.json(response);
    
    })

app.post('/fussy', (req, res) => {
  let pesan = req.body.pesan
  let response = {
    pesan: pesan
}
res.json(response);
});

app.put('/', (err, res) => {
	res.status(200);
	res.send('working');
	res.end();
});

app.listen(8000, () => {
    console.log("buss di 8000");
})