const { HttpCode, ErrorMessages } = require('../helpers/constants')
const Contacts = require('../repositories/contacts')


const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    res.json({ status: 'success', code: HttpCode.OK, data: { contacts } })
  } catch (error) {
    next(error)
  } 
}

const getById = async (req, res, next) => {
  try {
    const {contactId} = req.params
    const contact = await Contacts.getContactById(contactId)
    if (contact) {
     return res.json({ status: 'success', code: HttpCode.OK, data: { contact } })
    }
    return res.json({ status: 'error', code: HttpCode.NOT_FOUND, message: ErrorMessages.NOT_FOUND })
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
  const contacts = await Contacts.addContact(req.body)
    if (!name || !email || !phone) {
    return res.status(HttpCode.BAD_REQUEST).json({ status: 'error', code: HttpCode.BAD_REQUEST, message: 'missing required name field' })
  } 
   return res.json({ status: 'success', code: HttpCode.CREATED, data: { contacts } })
  } catch (error) {
    next(error)
  } 
}

const removeContact = async (req, res, next) => {
  try {
    const {contactId} = req.params
    const contact = await Contacts.removeContact(contactId)
    if (contact) {
     return res.json({ status: 'success', code: HttpCode.OK, data: { contact } })
    }
    return res.json({ status: 'error', code: HttpCode.NOT_FOUND, message: ErrorMessages.NOT_FOUND })
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const {contactId} = req.params
    const contact = await Contacts.updateContact(contactId ,req.body)
    if (!req.body) {
        return res.json({status: 'error', code: HttpCode.BAD_REQUEST, message: 'missing fields'});
    } else if (contact) {
     return res.json({ status: 'success', code: HttpCode.OK, data: { contact } })
    }
    return res.json({ status: 'error', code: HttpCode.NOT_FOUND, message: ErrorMessages.NOT_FOUND })
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