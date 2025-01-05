const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true,
      },

      language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language', 
        required: true,
      },

      pdfUrl: {
        type: String, 
        required: true,
      },

    
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);


module.exports = {Book};