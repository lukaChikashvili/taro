const { asyncHandler } = require('../middlewares/asyncHandler');
const { User } = require('../models/userModel');
const bcrypt = require("bcryptjs");
const { generateToken } = require('../utils/createToken');

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


module.exports = {
    createUser,
    loginUser,
    logout
}