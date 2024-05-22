import mongoose from "mongoose";

export default async function DBConnection() {
  console.log("connecting")
  try {
    await mongoose.connect("mongodb+srv://shubhangidodake32:EX7sJGcnmo5GLE1e@cluster0.mpbyjcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("connected to mongodb");
  } catch (error) {
    console.log("Error connecting to mongodb", error.message);
  }
};