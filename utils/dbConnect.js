import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://medhanshv03:WTiJBX8NV8B3PIT5@cluster0.eqtdmtl.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default dbConnect;