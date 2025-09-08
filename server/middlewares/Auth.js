import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
  
  // Check header exists and starts with "Bearer"
  const token = authHeader && authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id;

        const user = await User.findById(userId);

        if(!user){
            return res.json({success: false, message: 'User not found'});
        }

        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({message: 'Not authorized, invalid token'})
    }
}