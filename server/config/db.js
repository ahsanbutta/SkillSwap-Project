import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')

    } catch (error) {
        console.error('DB Connection Error:', error.message);
        throw error;
    }

}
export default connectDb
