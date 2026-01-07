import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    console.log('Register Request Body:', req.body);
    const { name, email, password, skillsHave, skillsWant, bio } = req.body;

    if (!name || !email || !password || !skillsHave || !skillsWant) {
        console.log('Missing/Empty fields in register:', { name: !!name, email: !!email, password: !!password, skillsHave: !!skillsHave, skillsWant: !!skillsWant });
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    try {
        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            skillsHave,
            skillsWant,
            bio
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                skillsHave: user.skillsHave,
                skillsWant: user.skillsWant,
                token: generateToken(user._id),
                role: user.role
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for user email
        const user = await User.findOne({ email }); // Removed select('+password') because comparePassword handles it usually on the model, but let's check model. 
        // User implementation of comparePassword uses this.password. If select: false is on password in model, we DO need select('+password') here.
        // Let's re-add it to be safe if model has select: false
        const userWithPassword = await User.findOne({ email }).select('+password');

        if (userWithPassword && (await userWithPassword.comparePassword(password))) {
            res.json({
                _id: userWithPassword.id,
                name: userWithPassword.name,
                email: userWithPassword.email,
                skillsHave: userWithPassword.skillsHave,
                skillsWant: userWithPassword.skillsWant,
                token: generateToken(userWithPassword._id),
                role: userWithPassword.role
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
