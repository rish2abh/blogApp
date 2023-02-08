require("dotenv").config();
const express = require("express")
const bodyParser = require("body-parser")
require("./model/config")
const router = require("./Router/mainRouter")
const app = express()

app.use(bodyParser.json())
app.use('/',router)


app.listen(process.env.PORT, (req,res)=>{
    console.log(`Server is running port no : ${process.env.PORT}`)
})
