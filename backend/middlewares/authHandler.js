const { User } = require('../models/userModel') 
const { asyncHandler } = require('../middlewares/asyncHandler');
const jwt  = require('jsonwebtoken');

const authenticate = asyncHandler(async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId).select("-password");

        req.user = user;


        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
});



module.exports = {
    authenticate, 
   
}