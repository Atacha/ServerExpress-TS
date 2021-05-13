import mongoose from 'mongoose';

export const Connect = async (): Promise<void> => {
  const uri = process.env.MONGODB;
  try {
    await mongoose.connect(uri as string, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✨ MongoDB is connected');
  } catch (error) {
    console.log(`❌ Error:${error}`);
  }
};
