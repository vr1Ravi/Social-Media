import mongoose from "mongoose";

// Function to connect Database
async function connectDataBase() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Connected");
}
export { connectDataBase };
