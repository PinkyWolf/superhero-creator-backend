const express = require('express')
const ctrl = require('../../controllers/contacts')
const {validationCreateContact, validationUpdateContact} = require('../../validation')

const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validationCreateContact, ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validationUpdateContact, ctrl.updateContact)

router.patch('/:contactId/favorite', validationUpdateContact, ctrl.updateContact)

module.exports = router