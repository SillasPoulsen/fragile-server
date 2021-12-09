const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Notes = require("../models/note.model");

const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware");
const Episodes = require("../models/episode.model");

// Post notes /journey/:id and the Episode Id
router.post("/note/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { textInput, scaleInput, public } = req.body;
    const currentUser = req.payload;
    const currentEpisodeId = req.params.id;

    if (!textInput && !scaleInput) {
      res.status(400).json({ message: "You have to provide an input" });
      return;
    }

    const createdNote = await Notes.create({
      creator: currentUser,
      episode: currentEpisodeId,
      textInput: textInput,
      scaleInput: scaleInput,
      public: public,
    });

    await Episodes.findByIdAndUpdate(
      currentEpisodeId,
      { $push: { notes: createdNote } },
      { $push: { hasFinished: currentUser._id } }
    );

    res.status(200).json(createdNote);

    currentJourney.findByIdAndUpdate(currentJourney, {});
  } catch (error) {
    console.log("noteErorr", error);
    next(error);
  }
});

module.exports = router;
