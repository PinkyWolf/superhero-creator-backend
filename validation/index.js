const Joi = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phoneRegexp = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        match: [emailRegexp, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: [false],
        match: [phoneRegexp, 'Please fill a valid phone number']
    },
    favorite:  {
        type: Boolean,
        default: false,
        required: [false]
    },
},{versionKey: false, timesstamps: true})

const Contacts = mongoose.model('contacts', userSchema);

const schemaCreateContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    phone: Joi.string().pattern(phoneRegexp).optional(),
    favorite: Joi.boolean().default(false).optional()
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional().pattern(emailRegexp),
    phone: Joi.string().optional().pattern(phoneRegexp),
    favorite: Joi.boolean().default(false).optional()
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
    validationCreateContact:(req, res, next) => {
        return validate(schemaCreateContact, req.body, next)
    },
    validationUpdateContact:(req, res, next) => {
        return validate(schemaUpdateContact, req.body, next)
    },
    Contacts
}