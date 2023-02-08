const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const schema = {
  signUpVal: joi
    .object({
      userName: joi.string().max(20).required(),
      email: joi.string().email().required(),
      password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(2)
        .noWhiteSpaces()
        .messages({
          "password.minOfUppercase":
            "{#label} should contain at least {#min} uppercase character",
          "password.minOfSpecialCharacters":
            "{#label} should contain at least {#min} special character",
          "password.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
          "password.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "password.noWhiteSpaces": "{#label} should not contain white spaces",
        })
        .required(),
      city: joi.string().max(15).required(),
      state: joi.string().max(15).required(),
    })
    .unknown(true),

  loginVal: joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .messages({ password: "User Email is Vaild,But password is incorrect" })
      .required(),
  }),
};

module.exports = schema;
