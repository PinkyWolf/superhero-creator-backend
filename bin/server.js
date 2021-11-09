require('dotenv').config
const app = require('../app')
const db = require('../model/db')
const createFolder = require('../helpers/create-folder')

const PORT = process.env.PORT || 3000
const UPLOAD_DIR = process.env.UPLOAD_DIR
const USERS_AVATARS = process.env.USERS_AVATARS

db.then(() => {
  app.listen(PORT, async () => {
    await createFolder(UPLOAD_DIR)
    await createFolder(USERS_AVATARS)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch( (e) => {
  console.log(`Error:${e.message}`);
})
