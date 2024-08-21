import mongoose from 'mongoose';

const connectDB = async (): Promise<boolean | void> => {
  if (mongoose.connections[0].readyState) {
    return true;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Mongodb connected');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default connectDB;
