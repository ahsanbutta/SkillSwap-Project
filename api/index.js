import dotenv from 'dotenv';
import connectDB from '../server/config/db.js';
import app from '../server/app.js';

dotenv.config();
connectDB();

export default app;
