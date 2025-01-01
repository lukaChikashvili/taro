const { asyncHandler } = require('../middlewares/asyncHandler');
const { User } = require('../models/userModel');
const bcrypt = require("bcryptjs");
const { generateToken } = require('../utils/createToken');

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




module.exports = {
    createUser
}