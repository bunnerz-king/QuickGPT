import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('DB connected');
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/quickgpt`)
    } catch (error) {
        console.error(error.message);
    }

}

export default connectDB;