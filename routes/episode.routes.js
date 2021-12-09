const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Notes = require("../models/note.model");

const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware");
const Episodes = require("../models/episode.model");

// Get the current Episode
router.get("/episode/:id", isAuthenticated, async (req, res, next) => {
  try {
    const currentEpisodeId = req.params.id;

    const currentEpisode = await Episodes.findById(currentEpisodeId)
      .populate("notes")
      .populate("hasFinished");

    res.status(200).json(currentEpisode);
  } catch (error) {
    next(error);
  }
});

router.get("/episode", isAuthenticated, async (req, res, next) => {
  try {
    const allEpisodes = await Episodes.find();

    res.status(200).json(allEpisodes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
