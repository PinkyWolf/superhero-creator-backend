const express = require('express')
const ctrl = require('../../controllers/contacts')
const { validationCreateContact, validationUpdateContact } = require('../../validation')
const guard = require('../../helpers/guard')

const router = express.Router()

router.get('/', guard ,ctrl.getAll)

router.get('/:contactId', guard , ctrl.getById)

router.post('/', guard , validationCreateContact, ctrl.addContact)

router.delete('/:contactId', guard , ctrl.removeContact)

router.put('/:contactId', guard , validationUpdateContact, ctrl.updateContact)

router.patch('/:contactId/favorite', guard , validationUpdateContact, ctrl.updateContact)

module.exports = router