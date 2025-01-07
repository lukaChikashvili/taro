const { asyncHandler } = require('../middlewares/asyncHandler');
const { Book } = require('../models/bookModel');
const { Lnaguage, Language } = require('../models/LanguageModel')

const createBook = asyncHandler(async (req, res) => {
   const { title, author, language, pdfUrl } = req.fields;

   try {
       
       if (!title) return res.status(400).json({ error: "Title is required" });
       if (!author) return res.status(400).json({ error: "Author is required" });
       if (!language) return res.status(400).json({ error: "Language is required" });
       if (!pdfUrl) return res.status(400).json({ error: "PDF URL is required" });

       
       const languageExists = await Language.findById(language);
       if (!languageExists) {
           return res.status(400).json({ error: "Invalid language ID" });
       }

       const book = new Book({ title, author, language, pdfUrl });
       await book.save();

       res.status(201).json(book);
   } catch (error) {
       res.status(400).json({ error: error.message });
   }
     
});

module.exports = {
    createBook
};
