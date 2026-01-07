import dotenv from 'dotenv';
import connectDB from '../server/config/db.js';
import app from '../server/app.js';

console.log('Vercel API function initialized');
dotenv.config();

// Ensure DB is connected
connectDB().then(() => console.log('DB Connection Attempted'));

export default app;
