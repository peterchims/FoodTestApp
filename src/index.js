import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { TestApp } from "./db/schema.js";

const app = express();
const PORT = ENV.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully 🚀" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

app.post("/api/favorites", async (req, res) => {
  try {
    const { 
      user_id,
      recipe_id,
      title,
      image,
      cook_title,
      servings,
    } = req.body;

    // Check required fields
    if (!user_id || !recipe_id || !title) {
      return res.status(400).json({ error: "Missing required fields: user_id, recipe_id, and title are required" });    
    }

    const newData = await db.insert(TestApp).values({
      user_id,
      recipe_id, 
      title,
      image,
      cook_title,
      servings,
      // created_at will be automatically set by DEFAULT now()
    }).returning();

    res.status(201).json(newData[0]);
    
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
});

// GET endpoint to retrieve favorites
app.get("/api/favorites", async (req, res) => {
  try {
    const favorites = await db.select().from(TestApp);
    res.status(200).json(favorites);
  } catch (error) {
    console.log("Error fetching favorites", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});