import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

// API to register user
export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userExists = await User.findOne({email});
        if(userExists){
            return res.json({success: false, message: 'User already exists'})
        }

        const user = await User.create({name, email, password});

        const token = generateToken(user._id);
        res.json({success: true, token});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Login user
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if(isMatch){
                const token = generateToken(user._id);
                res.json({success: true, token});
            } else {
                const err = new Error("Invalid Credentials");
                err.status = 401;
                throw err;
           }
        } else {
             const err = new Error("Invalid Credentials");
                err.status = 401;
                throw err;
        }
    } catch (error) {
         const err = new Error(error.message);
                err.status = 401;
                throw err;
    }
}

// get User
export const getUser = async (req, res) => {
    try {
        const user = req.user;
        return res.json({success: true, user})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}