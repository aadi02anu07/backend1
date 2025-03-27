require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Default route to check if the server is running
app.get("/", (req, res) => {
  res.send("Backend is running successfully on Railway!");
});

// ✅ Routes
app.use("/api/patients", patientRoutes);
app.use("/api/auth", authRoutes);

// ✅ Use PORT from environment variables (default: 5000)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

// ✅ Debugging log for route registration
console.log("🔍 Registering Patient Routes at /api/patients");
app.use("/api/patients", patientRoutes);
