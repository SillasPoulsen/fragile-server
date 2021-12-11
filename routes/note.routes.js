const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Notes = require("../models/note.model");

const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware");
const Episodes = require("../models/episode.model");

// Post notes
router.post("/note", isAuthenticated, async (req, res, next) => {
  try {
    console.log(req.body);
    const { textInput, public, episode } = req.body;
    const currentUser = req.payload;
    //const currentEpisodeId = req.params.id;

    if (!textInput && !scaleInput) {
      res.status(400).json({ message: "You have to provide an input" });
      return;
    }

    const createdNote = await Notes.create({
      creator: currentUser,
      episode: episodeId,
      textInput: textInput,
      scaleInput: scaleInput,
      public: public,
    });

    await Episodes.findByIdAndUpdate(
      currentEpisodeId,
      { $push: { notes: createdNote } },
      { $push: { hasFinished: currentUser._id } }
    );

    await User.findByIdAndUpdate(currentUser, {
      $push: { hasDone: currentEpisodeId },
    });

    res.status(200).json(createdNote);

    //currentJourney.findByIdAndUpdate(currentJourney, {});
  } catch (error) {
    console.log("noteErorr", error);
    next(error);
  }
});

module.exports = router;
