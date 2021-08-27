const fs = require('fs/promises')
const path = require('path')
const {v4: uuid} = require('uuid')

const contacts = path.join( __dirname, 'contacts.json')

const getAllData = async() => {
  const data = await fs.readFile(contacts, 'utf-8')
  return JSON.parse(data)
}

const listContacts = async () => {
  return await getAllData()
}

const getContactById = async (contactId) => {
  const data = await getAllData()
  const [result] = data.filter((contact) => contact.id === contactId)
  return result
}

const removeContact = async (contactId) => {

}

const addContact = async (body) => {
  const id = uuid()
  const recordedContact = {
    id,
    ...body
  }
  const data = await getAllData()
  data.push(recordedContact)
  await fs.writeFile(contacts, JSON.stringify(data))
  return recordedContact
}

const updateContact = async (contactId, body) => {

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
