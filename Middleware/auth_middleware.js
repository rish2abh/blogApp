const jwt = require("jsonwebtoken")
const user_schema = require("../model/UserSchema")

const checkAuthUser = async (req,res,next)=>  {
    let token;
    const {authorization} = req.headers;
    try{
        if(authorization && authorization.startsWith("Bearer")){
            token = authorization.split(" ")[1];
            const { userID } = jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.user = await user_schema.findById(userID).select("-password")
            console.log("auth user ===>",req.user)
            next();
        }else{
            res.json({
                status : 401,
                message : "Authorization is Empty or Bearer"
            })
        }
    }catch(error){
        res.json({
            status : 400,
            message : error.message
        })
    }
}
module.exports = checkAuthUser