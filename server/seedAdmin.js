import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = 'admin@example.com';
        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const adminUser = await User.create({
            name: 'Admin User',
            email: adminEmail,
            password: 'admin123', // Model pre-save will hash this
            skillsHave: ['Administration', 'Management'],
            skillsWant: ['Everything'],
            bio: 'I am the system administrator.',
            role: 'admin'
        });

        console.log('Admin user created successfully');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
