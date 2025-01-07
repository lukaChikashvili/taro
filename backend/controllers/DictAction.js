const {asyncHandler} = require('../middlewares/asyncHandler');
const { Language } = require('../models/LanguageModel');
const { Dict } = require('../models/DictionaryModel')


const createWord = asyncHandler(async(req, res) => {
   const { word, meaning, gender, language} = req.body;

   try {

    if (!word) return res.status(400).json({ error: "word is required" });
       if (!meaning) return res.status(400).json({ error: "meaning is required" });
       if (!gender) return res.status(400).json({ error: "gender is required" });
       if (!language) return res.status(400).json({ error: "language is required" });

       const languageExists = await Language.findById(language);
       if (!languageExists) {
           return res.status(400).json({ error: "Invalid language ID" });
       }

       const words = new Dict({word, meaning, gender, language});

       await words.save();

       res.status(201).json(words);
    
   } catch (error) {
    res.status(400).json({ error: error.message });
   }
})


const getAllWords = asyncHandler(async(req, res) => {
   
    try {
         
        const allWords = await Dict.find({});
        res.json(allWords);
         
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const deleteWord = asyncHandler(async(req, res) => {
    try {
        
        const words = await Dict.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "word deleted", words});
        

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports = {
    createWord,
    getAllWords,
    deleteWord
}