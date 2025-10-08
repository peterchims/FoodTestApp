import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { TestApp } from "./db/schema.js";
import { eq, and } from "drizzle-orm";
import job from "./config/cron.js";

const app = express();
const PORT = ENV.PORT || 5001;

if (ENV.NODE_ENV === "production") job.start();

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
    }).returning();

    res.status(201).json(newData[0]);
    
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
});

// GET endpoint to retrieve all favorites
app.get("/api/favorites", async (req, res) => {
  try {
    const favorites = await db.select().from(TestApp);
    res.status(200).json(favorites);
  } catch (error) {
    console.log("Error fetching favorites", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// GET endpoint to retrieve favorites by user_id
app.get("/api/favorites/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const userFavourites = await db.select()
      .from(TestApp)
      .where(eq(TestApp.user_id, user_id));
    
    res.status(200).json(userFavourites);
  } catch (error) {
    console.log("Error fetching user favorites", error);
    res.status(500).json({ error: "Failed to fetch user favorites" });
  }
});

// DELETE endpoint by ID (easier)
app.delete("/api/favorites/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFavorites = await db.delete(TestApp)
      .where(eq(TestApp.id, parseInt(id)))
      .returning();

    if (deletedFavorites.length === 0) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.status(200).json({ 
      message: "Favorite deleted successfully", 
      deleted: deletedFavorites[0] 
    });
    
  } catch (error) {
    console.log("Error removing favorite", error);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

// DELETE endpoint by user_id and recipe_id
app.delete("/api/favorites/:user_id/:recipe_id", async (req, res) => {
  try {
    const { user_id, recipe_id } = req.params;

    const deletedFavorites = await db.delete(TestApp)
      .where(
        and(
          eq(TestApp.user_id, user_id),
          eq(TestApp.recipe_id, recipe_id)
        )
      )
      .returning();

    if (deletedFavorites.length === 0) {
      return res.status(404).json({ 
        error: "Favorite not found for this user and recipe combination" 
      });
    }

    res.status(200).json({ 
      message: "Favorite deleted successfully", 
      deleted: deletedFavorites[0] 
    });
    
  } catch (error) {
    console.log("Error removing favorite", error);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

// DELETE endpoint to remove all favorites
app.delete("/api/favorites", async (req, res) => {
  try {
    const deletedFavorites = await db.delete(TestApp).returning();
    
    res.status(200).json({ 
      message: "All favorites deleted successfully", 
      deletedCount: deletedFavorites.length
    });
    
  } catch (error) {
    console.log("Error deleting all favorites", error);
    res.status(500).json({ error: "Failed to delete all favorites" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});