const mongoose = require('mongoose')
const { Schema } = mongoose; 

// Board model

const boardSchema = new Schema ({
    status: {type: String, required: true},
    board:[{type: String},{type: String},{type: String},{type: String},{type: String},{type: String},{type: String},{type: String},{type: String}],
    turn:{type: String},
    totalMoves:{type: Number}
})

// modul from the Schema 

module.exports = mongoose.model('Board', boardSchema)