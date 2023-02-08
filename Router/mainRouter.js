const express = require("express");
const router = express();
const user = require("./userRouter");
const blog  = require("./blogRouter")

router.use("/user", user);
router.use("/blog",blog)

module.exports = router;
