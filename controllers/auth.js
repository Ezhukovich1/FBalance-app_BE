import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

// Register
export const register = async (req, res) => {
    try {
        const { username, password, phone } = req.body;

        const isUsed = await User.findOne({username});

        if(isUsed) {
            return res.json({message: 'Current username is exist'});
        }

        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            phone,
            password: hash
        });

        const token = jwt.sign({
            id: newUser._id
        }, process.env.JWT_SECRET, {expiresIn: '30d'});

        await newUser.save();

        res.json({
            data: {
              newUser,
              token,
            },
            message: "Registration is success!"
        })

    } catch (error) {
       res.json({message: 'Error in registration'})
    }
};
// Login
export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});

        if(!user) {
            return res.json({
                message: 'User is not exist.'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.json({
                message: 'Password or username is not correct.'
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {expiresIn: '30d'});

        res.json({
            data: {
              user,
              token,
            }, message: 'Sign in successfully'
        })
    } catch (error) {
        res.json({message: 'Auth error'});
    }
};

// Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if(!user) {
            return res.json({
                message: 'User is not exist.'
            });
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {expiresIn: '30d'});

        res.json({
            data: {user, token}
        })

    } catch (error) {
        console.log(error);
        res.json({message: "Access denied"})
    }
};