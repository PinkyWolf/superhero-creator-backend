const Joi = require('joi');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const SALT = 8

const Schema = mongoose.Schema

const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    min: 8
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [emailRegexp, 'Please fill a valid email address'],
    unique: true
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('users', userSchema);

const schemaCreateUser = Joi.object({
    password: Joi.string().min(8).required(),
    email: Joi.string().pattern(emailRegexp).email().required(),
    subscription: Joi.string().default("starter"),
    token: Joi.boolean().default(false).optional()
})

const schemaUpdateUser = Joi.object({
    password: Joi.string().min(8).optional(),
    email: Joi.string().pattern(emailRegexp).email().optional(),
    subscription: Joi.string().default("starter"),
    token: Joi.boolean().default(false).optional()
})

const validate = async (schema, obj, next) => {
try {
    await schema.validateAsync(obj)
    next()
} catch (error) {
    next({
        status: 400,
        message: error.message
    })
  }
}

module.exports = {
    validationCreateUser:(req, res, next) => {
        return validate(schemaCreateUser, req.body, next)
  },
  validationUpdateUser:(req, res, next) => {
        return validate(schemaUpdateUser, req.body, next)
    },
    User
}