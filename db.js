const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/coches'

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind("NO hay conexión db"))
db.once('open', () => {
    console.log("Conectado a db");
})