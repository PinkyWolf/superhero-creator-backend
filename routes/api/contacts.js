const express = require('express')
const Contacts = require('../../model/contacts')
const {validationCreateContact, validationUpdateContact} = require('../../validation/validation')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  } 
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {id} = req.params
    const contact = await Contacts.getContactById(id)
    if (contact) {
     return res.json({ statusyar: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

router.post('/', validationCreateContact,  async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
  const contacts = await Contacts.addContact(req.body)
    if (!name || !email || !phone) {
    return res.status(400).json({ status: 'error', code: 400, message: 'missing required name field' })
  } 
   return res.json({ status: 'success', code: 201, data: { contacts } })
  } catch (error) {
    next(error)
  } 
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {id} = req.params
    const contact = await Contacts.removeContact(id)
    if (contact) {
     return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validationUpdateContact, async (req, res, next) => {
  try {
    const {id} = req.params
    const contact = await Contacts.updateContact(id ,req.body)
    if (!req.body) {
        return res.json({status: 'error', code: 400, message: 'missing fields'});
    } else if (contact) {
     return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', validationUpdateContact, async (req, res, next) => {
  try {
    const {id} = req.params
    const contact = await Contacts.updateContact(id ,req.body)
    if (!req.body) {
        return res.json({status: 'error', code: 400, message: 'missing fields'});
    } else if (contact) {
     return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

module.exports = router