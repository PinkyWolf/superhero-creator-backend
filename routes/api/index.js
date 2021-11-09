const express = require('express')
const ctrl = require('../../controllers/users')
const { validationCreateUser, validationUpdateUser } = require('../../validation/userSchema')
const guard = require('../../helpers/guard')

const router = express.Router()

router.use('/contacts', require('./contacts'))
router.use('/users', require('./users'))


module.exports = router