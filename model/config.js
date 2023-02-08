const mongoose = require("mongoose")

mongoose.connect(process.env.URL,{useNewUrlParser : true})
const connection = mongoose.connection 
connection.once("open",function(){
 console.log("MongoDB connected Successfully ")
})


