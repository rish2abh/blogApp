const boolean = require("@hapi/joi/lib/types/boolean")
const string = require("@hapi/joi/lib/types/string")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName : {
        type : string,
        require : true
    },
    email : {
        type : string,
        require : true
    },
    password : {
        type : string,
        require : true
    },
    city : {
        type : string,
        require : true
    },
    state : {
        type : string,
        require : true
    },
    profile_pic : {
        type : string
    },
    isActive : {
        type : boolean,
        default : false
    },
    role : {
        type : string,
        default : "user"
    }
})
userSchema.set("timestamps",true)
module.exports = mongoose.model("user",userSchema)
