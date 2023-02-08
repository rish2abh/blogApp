const blog = require("./blogSchema");

module.exports = {
  validateBlogSchema: async (req, res, next) => {
    const value = await blog.createBlog.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.send({
        status: 400,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  vaildateCommentSchema: async (req, res, next) => {
    const value = await blog.postComment.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.json({
        status: 400,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
