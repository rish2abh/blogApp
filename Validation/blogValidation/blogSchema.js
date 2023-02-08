const joi = require('joi')
joi.objectid = require("joi-objectid")(joi)

const blogSchema = {
    createBlog : joi.object({
        userId : joi.objectid().required(),
        title : joi.string().min(2).max(15).required(),
        description : joi.string().min(10).max(200).required()
    }).unknown(true), 

   postComment : joi.object({
        comment : joi.string().max(30).required(),
        userId : joi.objectid().required(),
       blogId : joi.objectid().required()
    }).unknown(true),
}

module.exports = blogSchema
