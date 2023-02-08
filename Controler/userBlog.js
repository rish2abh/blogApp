const blog_schema = require("../model/blog_Schema");


const myBlogs = async (req, res) => {
  const id = req.params.id;
  try {
    const allBlog = await blog_schema.find({ userId: id }).lean().select({
      title: 1,
      description: 1,
      likes: 1,
      createdAt: 1,
      _id: 1,
    });
    res.json({
      status: 200,
      message: "My all blogs shown here",
      myBlogs: allBlog,
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
};

const Update = async (req, res) => {
  const id = req.params.id;
  try {
    const edit = await blog_schema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      status: 200,
      message: "Update Successfully",
      Update: edit,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
};

const Delete = async (req, res) => {
  const id = req.params.id;
  try {
    const remove = await blog_schema.findByIdAndDelete(id);
    res.json({
      status: 200,
      message: "Blog delete Successfully",
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err,
    });
  }
};

module.exports = { myBlogs, Update, Delete };
