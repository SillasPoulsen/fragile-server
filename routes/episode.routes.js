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

    const currentEpisode = await Episodes.findById(currentEpisodeId).populate(
      "notes"
    );
    const allNotesFromThisOneEpisode = currentEpisode.notes;
    console.log("allNotesFromThisOneEpisode :>> ", allNotesFromThisOneEpisode);
    const myUserNote = allNotesFromThisOneEpisode.filter(
      (note) => note.creator.toString() === req.payload._id
    );

    const firstUserNote = myUserNote[0];

    console.log("this is the firstUserNote", firstUserNote);

    res.status(200).json({ currentEpisode, firstUserNote });
  } catch (error) {
    next(error);
  }
});

// Get the current Episode
router.get("/episode/:id/notes", isAuthenticated, async (req, res, next) => {
  try {
    const currentEpisodeId = req.params.id;

    const currentEpisode = await Episodes.findById(currentEpisodeId).populate(
      "notes"
    );

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
