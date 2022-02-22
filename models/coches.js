const mongoose = require('mongoose')

const CochesSchema = mongoose.Schema({
    marca: {type: String, required: true},
    potencia: {type: String, required: true},
    url: {type: String, required: true},
    user_id: {type: mongoose.ObjectId, ref:'Users'},
})

module.exports = mongoose.model('Coches', CochesSchema)