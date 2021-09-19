const mongoose = require('mongoose');
require('dotenv').config()

const uriDb = process.env.URI_DB;
const db = mongoose.connect(uriDb, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log('connection opened');
})

mongoose.connection.on('error', (e) => {
    console.log(`${e.message}`);
})

process.on('SIGINT', async () => {
    mongoose.connection.close( () => {
        console.log('Connection to DB closed')
        process.exit(1)
    })
})

module.exports = db