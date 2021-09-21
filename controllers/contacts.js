const Contacts = require('../repositories/contacts')

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  } 
}

const getById = async (req, res, next) => {
  try {
    const {contactId} = req.params
    const contact = await Contacts.getContactById(contactId)
    if (contact) {
     return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
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
}

const removeContact = async (req, res, next) => {
  try {
    const {contactId} = req.params
    const contact = await Contacts.removeContact(contactId)
    if (contact) {
     return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const {contactId} = req.params
    const contact = await Contacts.updateContact(contactId ,req.body)
    if (!req.body) {
        return res.json({status: 'error', code: 400, message: 'missing fields'});
    } else if (contact) {
     return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error)
  }
}
module.exports = {
    getAll,
    getById,
    addContact,
    removeContact,
    updateContact
}