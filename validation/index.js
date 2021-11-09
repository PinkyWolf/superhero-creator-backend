const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Nickname required"],
    },
    realName: {
      type: String,
      required: [false],
    },
    originDescription: {
      type: String,
      required: [true, "Small description of your hero required"],
    },
    superpowers: {
      type: String,
      required: [true, "At least 1 power required"],
    },
    catchPhrase: {
      type: String,
      required: [false],
    },
    avatarUrl: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Heroes = mongoose.model("heroes", contactSchema);

const schemaCreateContact = Joi.object({
  nickname: Joi.string().required(),
  realName: Joi.string().optional(),
  originDescription: Joi.string().optional(),
  superpowers: Joi.string().required(),
  catchPhrase: Joi.string().optional(),
});

const schemaUpdateContact = Joi.object({
  nickname: Joi.string().optional(),
  realName: Joi.string().optional(),
  originDescription: Joi.string().optional(),
  superpowers: Joi.string().optional(),
  catchPhrase: Joi.string().optional(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    next({
      status: 400,
      message: error.message,
    });
  }
};

module.exports = {
  validationCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
  },
  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
  Heroes,
};
