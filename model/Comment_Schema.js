const boolean = require("@hapi/joi/lib/types/boolean")
const string = require("@hapi/joi/lib/types/string")
const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment : {
        type : string,
        require : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "user"
    },
    blogId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "blogs"
    },
    isActive : {
        type : boolean,
        require : true
    },
})
commentSchema.set("timestamps",true)
module.exports = mongoose.model("comment",commentSchema)
