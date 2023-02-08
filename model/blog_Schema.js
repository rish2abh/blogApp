const boolean = require("@hapi/joi/lib/types/boolean")
const string = require("@hapi/joi/lib/types/string")
const mongoose = require("mongoose")

const  blogSchema = new mongoose.Schema({
    title : {
        type : string,
        require : true
    },
    description : {
        type : string,
        require : true
    },
    status : {
        type : boolean,
        require : true
    },
    likes : {
        type : Number,
        default : 0,
    },
    blog_image : {
        type : string
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true
    },
    isActive : {
        type : boolean,
        require : true
    }, 
})

blogSchema.set("timestamps",true)
module.exports = mongoose.model("blogs",blogSchema)
