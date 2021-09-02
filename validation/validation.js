const Joi = require('joi');

const phoneRegexp = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().pattern(emailRegexp),
    phone: Joi.number().pattern(phoneRegexp)
})
module.exports = schema;