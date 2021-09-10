const Joi = require('joi');

const phoneRegexp = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schemaCreateContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    phone: Joi.string().pattern(phoneRegexp).optional()
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional().pattern(emailRegexp),
    phone: Joi.string().optional().pattern(phoneRegexp)
}).or("name", "email", "phone")

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
    }
}