import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

export const connectToDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    }