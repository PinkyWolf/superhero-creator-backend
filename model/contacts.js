const db = require('./db')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name);
  return collection
}

const listContacts = async () => {
  return await getAllData()
}

const getContactById = async (contactId) => {
  const data = await getAllData()
  const [result] = data.filter((contact) => contact.id.toString() === contactId)
  return result
}

const removeContact = async (contactId) => {
  const data = await getAllData()
  const result = data.find(( contact ) => contact.id.toString() === contactId);
  const newData = data.filter((contact) => contact.id.toString() !== contactId)
  await fs.writeFile(contacts, JSON.stringify(newData))
  return result  
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
  const data = await getAllData()
  const [result] = data.filter((contact) => contact.id.toString() === contactId)
  if (result) {
   Object.assign(result, body)
   await fs.writeFile(contacts, JSON.stringify(data)) 
  }
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
