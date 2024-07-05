const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 3000;
const apiKey = "AIzaSyBfoav2AJ_KxWTrcedVp0836DpFu9sKW54";

app.use(cors());

let favorites = [];

app.use(express.json());

app.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${query}&key=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/favorite", (req, res) => {
  const { videoId, title } = req.body;
  const index = favorites.findIndex((fav) => fav.id === videoId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push({ id: videoId, title });
  }
  res.json({ isFavorited: index === -1, favoriteCount: favorites.length });
});

app.get("/favorites", (req, res) => {
  res.json(favorites);
});

app.listen(PORT, () => {
  console.log(`BFF server running on http://localhost:${PORT}`);
});
