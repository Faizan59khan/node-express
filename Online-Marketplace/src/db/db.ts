import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error(
        "MongoDB URI is not provided in the environment variables."
      );
    }

    const options: ConnectOptions = {
      // Uncomment the following lines if needed
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    };

    const conn = await mongoose.connect(mongoURI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
