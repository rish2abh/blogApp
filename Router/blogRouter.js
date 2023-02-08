const express = require("express")
const router = express()
const blogVal = require("../Validation/blogValidation/blog_Validation")
const blogcontroler = require("../Controler/blog_Controler")
const  upload  = require('../Middleware/imageStorage')
const blogauth = require("../Middleware/auth_middleware")


router.post("/post",upload.single("blog_image"),blogVal.validateBlogSchema,blogcontroler.blogPost)
router.get("/list",blogcontroler.blogList)
router.post("/createComment",blogauth,blogVal.vaildateCommentSchema,blogcontroler.createComment)
router.get("/allcomment/:id",blogcontroler.commentlist)
router.get("/likeblog/:id/:likes",blogauth,blogcontroler.likePost)
router.get("/search",blogcontroler.search)

module.exports = router
