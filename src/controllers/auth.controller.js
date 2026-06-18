import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils.js';

// @route   POST /auth/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email is already registered.' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword 
        });

        const accessToken = generateAccessToken({ id: newUser._id });
        const refreshToken = generateRefreshToken({ id: newUser._id });

        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully!',
            accessToken,
        });
    } catch (error) {
        res.status(500).json({ error: `Server Error: ${error.message}` });
    }
};

// @route   POST /auth/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password.' });

        const accessToken = generateAccessToken({ id: user._id });
        const refreshToken = generateRefreshToken({ id: user._id });

        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            message: 'Login successful!',
            accessToken,
        });
    } catch (error) {
        res.status(500).json({ error: `Server Error: ${error.message}` });
    }
};