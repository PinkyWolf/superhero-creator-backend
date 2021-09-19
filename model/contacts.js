const { Contacts } = require('../validation')

const listContacts = async () => {
  const results = await Contacts.find()
  return results
}

const getContactById = async (contactId) => {
  const result = await Contacts.findOne({_id: contactId})
  return result
}

const removeContact = async (contactId) => {
  const res  = await Contacts.findOneAndDelete({ _id: contactId })
  return res
}

const addContact = async (body) => {
  const result = await Contacts.create(body)
  return result
}

const updateContact = async (contactId, body) => {
  const res = await Contacts.findOneAndUpdate({ _id: contactId }, { ...body }, { new: false})
  return res
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
