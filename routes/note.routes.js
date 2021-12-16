const express = require("express");
const router = express.Router();
const Episode = require("../models/episode.model");
const User = require("../models/user.model");
const Notes = require("../models/note.model");

const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware");

// Post notes
router.post("/note", isAuthenticated, async (req, res, next) => {
  try {
    const { textInput, public, episode } = req.body;
    const currentUser = req.payload._id;

    if (!textInput && !scaleInput) {
      res.status(400).json({ message: "You have to provide an input" });
      return;
    }

    const createdNote = await Notes.create({
      creator: currentUser,
      episode: episode,
      textInput: textInput,
      //scaleInput: scaleInput,
      public: public,
    });

    console.log("this is the createdNote", createdNote);

    const updatedEpisode = await Episode.findByIdAndUpdate(episode, {
      $push: { notes: createdNote._id },
    });

    const userObj = await User.findByIdAndUpdate(currentUser, {
      $push: { hasDone: episode },
    });

    res.status(200).json(createdNote);
  } catch (error) {
    console.log("noteErorr", error);
    next(error);
  }
});

router.post("/note/like", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    console.log("1");
    console.log(req.body);
    const currentUserId = req.payload._id;
    const noteId = req.body.id;
    console.log(noteId);
    console.log("2");
    const noteFound = await Notes.findOne({
      _id: noteId,
      upVotes: currentUserId,
    });
    console.log("3");
    if (noteFound) {
      const updatedNote = await Notes.findByIdAndUpdate(noteId, {
        $pull: { upVotes: currentUserId },
      });
      res.status(200).json(updatedNote);
    } else if (!noteFound) {
      const updatedNote = await Notes.findByIdAndUpdate(noteId, {
        $push: { upVotes: currentUserId },
      });
      res.status(200).json(updatedNote);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
