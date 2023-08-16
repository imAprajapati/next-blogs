import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI!,);
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("Database connected");
    });
    connection.on("error", () => {
      console.log("Connection failed");
    });
  } catch (error) {
    console.log(error);
  }
}

export default dbConnection;