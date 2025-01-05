const mongoose = require('mongoose');


const languageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    level: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});



const Language = mongoose.model('Language', languageSchema);

module.exports = {Language};
