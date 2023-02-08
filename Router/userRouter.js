const express = require('express')
const router = express()
const { validate } = require('../model/Comment_Schema')
const user = require("../Controler/userControler")
const userVal = require("../Validation/user/userValidation")
const userBlog = require("../Controler/userBlog")
const upload = require("../Middleware/imageStorage")
const auth = require("../Middleware/auth_middleware")


router.post("/create",upload.single("profile_pic"),userVal.userValidation,user.signUp)
router.post ("/login",userVal.userLoginVal,user.userLogin)
router.get("/myblogs/:id",auth,userBlog.myBlogs)
router.patch("/update/:id",auth,userBlog.Update)
router.delete("/delete/:id",auth,userBlog.Delete)
router.post("/send-reset-email",auth,user.sendUserResetPasswordEmail)
router.post("/password-reset/:id/:token",auth,user.userPasswordReset)

module.exports = router

