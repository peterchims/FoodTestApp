import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5001

app.get("/", (req, res) => {
  res.send("Hello! Server is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running iop on port: ${PORT}`);
});
