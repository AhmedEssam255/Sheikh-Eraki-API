import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    const uri = process.env.MONGOOSE_URI;

    await mongoose.connect(uri);

    console.log('MongoDB Connected');
  } catch (error) {
    error.status = error.status || 500;
    error.message = error.message || 'Error connecting to MongoDB';
    throw error;
  }
};

export default connectDB;
