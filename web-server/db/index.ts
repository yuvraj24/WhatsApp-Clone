import mongoose from "mongoose";

const databaseConnectionString = process.env.MONGODB_URI;

if (!databaseConnectionString) {
  console.warn("MONGODB_URI is not configured. Database-backed routes are unavailable.");
} else {
  mongoose.connect(databaseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
}

export default mongoose.connection;
