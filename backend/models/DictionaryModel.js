const mongoose = require('mongoose');


const dictionarySchema = mongoose.Schema({
    word: {
        type: String,
        required: true
    },

    meaning: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    }


});


const Dict = mongoose.model('Dict', dictionarySchema);

module.exports = {Dict};
