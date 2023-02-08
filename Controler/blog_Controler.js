const Blog = require("../model/blog_Schema");
const Comment_Schema = require("../model/Comment_Schema");

const blogPost = async (req, res) => {
  const data = new Blog(req.body);
  try {
    const filePath = `/uploads/${req.file.filename}`;
    data.blog_image = filePath;
    const addPost = await data.save();
    console.log(addPost);
    res.json({
      status : 200,
      message : addPost,
    });
  } catch (err) {
    res.json({
      status : 400,
      message : err.message,
    });
  }
};

const blogList = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("userId", { userName: 1, profile_pic : 1, _id: 0 });
    res.json({
      status : 200,
      Blogs : blogs,
    });
  } catch (error) {
    res.json({
      status : 400,
      message : error.message,
    });
  }
};

const createComment = async (req, res) => {
  try {
    const data = new Comment_Schema(req.body);
    const comment = await data.save();
    res.json({
      status : 200,
      message : "Comment add sucssefully"
    });
  } catch (error) {
    res.json({
      status : 400,
      message : error.message,
    });
  }
};

const commentlist = async (req, res) => {
  const id = req.params.id;
  try {
    const list = await Comment_Schema
      .findOne({ blogId: id })
      .select({ createdAt: 1, _id: 0 })
      .populate("blogId", { title: 1, description: 1, createdAt: 1, _id: 0 });
    const user = await Comment_Schema.find({ blogId: id })
      .populate("userId", { userName: 1, profile_pic: 1, _id: 0 });
    res.json({
      status : 200,
      message : "All Comment are shown",
    });
  } catch (err) {
    res.json({
      status : 400,
      message : err.message,
    });
  }
};

const likePost = async (req, res) => {
  const { id, likes } = req.params;
  try {
    const blogLikes = await Blog.findById(id)
  let like = blogLikes.likes;
    if (likes === "true") {
      
      like++;
      const likeUpdate = await Blog.findByIdAndUpdate(id,
        { $set: { likes: like} },
        { new: true }
      );
      res.json({
        status : 200,
        message : "like successful",
        message : likeUpdate
      });
    } else {
      like--;
      const likeUpdate = await Blog.findByIdAndUpdate(
        blogLikes._id,{ $set: { likes: like } },{ new: true }
      );
      res.json({
        status : 200,
        message : "Dislike successful",
      });
    }
  } catch (error) {
    res.send({
      status : 400,
      message : error.message,
    });
  }
};

const search = async(req,res)=>{
  const title = req.body.title
  try{
    const blogSearch = {title : { $regex : title , $options : "i" }};
    console.log("title");
  const  foundTitle = await Blog.find(blogSearch)
  if (foundTitle == 0){
    res.json({
      status : 404,
      message : "Title not found"
    })
  }else{
    res.json ({
      status : 200,
      message : "showing result",foundTitle
       })
  }
  }catch(err){
    res.json({
      status : 400,
      message : err.message
    })
  }
}


module.exports = {
  blogPost,
  blogList,
  createComment,
  commentlist,
  likePost,
  search
};
