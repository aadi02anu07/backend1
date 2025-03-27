const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Debugging Middleware (Logs all incoming requests)
app.use((req, res, next) => {
  console.log(`🔍 Incoming request: ${req.method} ${req.url}`);
  next();
});

// ✅ Debug log to check if routes are loading
console.log("🔧 Registering routes...");
app.use("/api/patients", patientRoutes);
app.use("/api/auth", authRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Backend is running successfully on Railway!");
});

// ✅ List all routes (to see if /api/patients is actually registered)
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`✅ Route registered: ${r.route.path}`);
  }
});

// ✅ MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
