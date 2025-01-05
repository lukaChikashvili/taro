const { asyncHandler } = require('../middlewares/asyncHandler');
const { User } = require('../models/userModel');
const bcrypt = require("bcryptjs");
const { generateToken } = require('../utils/createToken');
const { Language } = require('../models/LanguageModel');

// create user
const createUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        throw new Error("fill in all inputs");

    }

    const userExists = await User.findOne({email});

     if(userExists) res.status(400).send("მომხმარებელი უკვე არსებობს");

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     const newUser = new User({username, email, password: hashedPassword});
   
 
    try {

        await newUser.save();
        const token = generateToken(newUser._id);

        res.status(201).json({

            _id: newUser._id,
            username: newUser.username, 
            email: newUser.email, 
            token
        })
        
    } catch (error) {
        res.status(400);
        throw new Error('invalid user data')
    }
})


// login user
const loginUser = asyncHandler(async(req, res) => {
  const { email, password} = req.body;

  const existingUser = await User.findOne({ email });
  
    if (!existingUser) {
      return res.status(404).json({ message: 'მომხმარებელი ვერ მოიძებნა' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'ელ-ფოსტა ან პაროლი არასწორია.' });
    }
  

  try {
    
    const token = generateToken(existingUser._id);
    return res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        token,
      });

  } catch (error) {
    return res.status(500).json({ message: 'მონაცემები არასწორია' });
  }
});

// logout user
const logout = asyncHandler(async(req, res) => {
    res.status(200).json({message: "logged out successfully"});
});


const getCurrentProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id);

  if(user) {
     res.json({
         _id: user._id,
         username: user.username,
         email: user.email
     });
  }else {
     res.status(404);
     throw new Error('user not found');
  }
});


const createLanguage = asyncHandler(async(req, res) => {
     const { name, level } = req.body;

     if(!name || !level) {
      res.status(404).json({message: "name or level is not defined"});

     }

  

     try {

      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

       const language = new Language({ name, level, user: req.user._id });

       const savedLanguage = await language.save();

       res.status(201).json(savedLanguage);


      
     } catch (error) {
        res.status(500).json({message: error.message})
     }
});

const langList = asyncHandler(async(req, res) => {
  
   try {

      const allLangs = await Language.find({});

      res.status(200).json({
        success: true,
        data: allLangs
    });
    
   } catch (error) {
     res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
  });
   }
});

const getLangsById = asyncHandler(async(req, res) => {
  try {

    const language = await Language.findById(req.params.id);

    if(language) {
      return res.json(language);
    }else {
      res.status(404);
      throw new Error('language not found');
    }
    
  } catch (error) {
    console.error(error);
    res.status(404).json({error: "language not found"});
  }
})

module.exports = {
    createUser,
    loginUser,
    logout,
    getCurrentProfile,
    createLanguage, 
    langList,
    getLangsById
}