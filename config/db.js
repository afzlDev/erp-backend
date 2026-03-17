import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("[DB] connectDB called");
    console.log("[DB] MONGO_URI present:", Boolean(process.env.MONGO_URI));

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("[DB] MongoDB Connected");
  } catch (error) {
    console.error("[DB] Mongo connection failed:", error.message);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("[DB] mongoose connected event fired");
});

mongoose.connection.on("error", (error) => {
  console.error("[DB] mongoose connection error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("[DB] mongoose disconnected");
});

export default connectDB;
