import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default db();
