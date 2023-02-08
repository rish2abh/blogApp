const user = require("./userSchema");

module.exports = {
  userValidation: async (req, res, next) => {
    const value = await user.signUpVal.validate(req.body, { abortEarly: true });
    if (value.error) {
      res.json({
        status: 400,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  userLoginVal: async (req, res, next) => {
    const value = await user.loginVal.validate(req.body, { abortEarly: true });
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
