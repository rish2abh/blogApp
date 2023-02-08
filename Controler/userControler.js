const User = require("../model/UserSchema");
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const Transporter  = require("../service/mail_service");


const signUp = async (req, res) => {
  const { email, password } = req.body;
  const userData = new User(req.body);
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {   
      return res.json({
        status: 403,
        message: "Email Already Exist",
      });
    } else {
      const salt = await Bcrypt.genSalt(10);
      userData.password = await Bcrypt.hash(password, salt);
      const filePath = `/uploads/${req.file.filename}`;
      userData.profile_pic = filePath;
      const addData = userData.save();
      res.json({
        status: 201,
        message: "Data save Successfully",
      });
    }
  } catch (error) {
    res.json({
      status : 500,
      message : "Somthing Went Wrong",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const valUser = await User.findOne({ email : email });
      if (valUser != null) {
        const isMatch = await Bcrypt.compare(password, valUser.password);
        if (isMatch) {
          const token = Jwt.sign(
            { userID: valUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
          );
          const userData = await User.find({ email: email }, "-password");
          res.status(200).json({
            status : 200,
            message : "Login Successfully",
            token : token,
            data : userData,
          });
        } else {
          res.status(400).json({
            status :400 ,
            message: " Password is not Valid",
          });
        }
      } else {
        res.send({ status: 404,
        message: "You Are Not Register User" 
      });
      }
    }
  } catch (err) {
    res.send({
      status : 400,
      message : err.message
    });
  }
};

const sendUserResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try{
  const userVal = await User.findOne({ email : email });
  if (userVal) {
    const secret = userVal._id + process.env.JWT_SECRET_KEY;
    const token = Jwt.sign({ userID : userVal._id }, secret, { expiresIn: "15m" });
    const link = `http://127.0.0.1:3000/api/userVal/reset/${userVal._id}/${token}`;

    console.log("===>>> link", link);
    let info = await Transporter.sendMail({
      from : "rishabhshrivastava205@gmail.com",
      to : email,
      subject : "Password Reset Link",
      html : `<a href = ${link}>Click here to reset password </a>`,
    });
    res.json({
      status : 200,
      message : "Please Check Your Mail",
      token,
    });
  } else {
    res.send({
      status : 400,
      message : "Email is required",
    });
  }
}catch(err){
  res.json({
    status : 500,
    message : err.message,
  });
}

}

const userPasswordReset = async (req, res) => {
  const { password, confirm_password } = req.body;
  const { id, token } = req.params;
  const User = await User.findById(id);
  const new_secret = User._id + process.env.JWT_SECRET_KEY;
  try {
    Jwt.verify(token, new_secret);
    if (password && confirm_password) {
      if (password != confirm_password) {
        res.json({
          status: 401,
          message: "Password and confirm password Should be Same",
        });
      } else {
        const salt = await Bcrypt.genSalt(10);
        const new_password = await Bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(User._id, {
          $set: { password: new_password },
        });
        res.json({
          success: 200,
          message: "Password Reset Succesfully",
        });
      }
    } else {
      res.json({
        status: 400,
        message: "All Fields Are Required",
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      message: message.err,
    });
  }
};

module.exports = {
  signUp,
  userLogin,
  sendUserResetPasswordEmail,
  userPasswordReset,
};
