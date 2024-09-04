import mongoose, { Connection } from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please provide a MongoDB String");
}
let cachedConn: Connection | null = null;

async function connectToDB(): Promise<Connection> {
  if (cachedConn) return cachedConn;
  try {
    const cxt = await mongoose.connect(MONGODB_URI as string);
    cachedConn = cxt.connection;
    return cachedConn;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
export default connectToDB;
