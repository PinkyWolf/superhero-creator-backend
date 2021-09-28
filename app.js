const express = require('express')
const logger = require('morgan')
const cors = require('cors')


const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')
const {HttpCode} = require('./helpers/constants')


const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/', require('./routes/api'))

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
})

app.use((err, req, res, next) => {
  const status = err.status || HttpCode.INTERNAL_SERVER_ERROR
  res.status(status).json({ status: 'fail', code: status, message: err.message })
})

module.exports = app
