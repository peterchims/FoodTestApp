import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";



const app = express();
const PORT = ENV.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully 🚀" });
});

app.get("/api/health", (req,res) => {
  res.status(200).json({success:true});
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
