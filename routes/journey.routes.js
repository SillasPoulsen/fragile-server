const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Journey = require("../models/journey.model");
const Episode = require("../models/episode.model");

const { isAuthenticated, isAdmin } = require("../middleware/jwt.middleware");

//get alle the different journeys

router.get("/journey", isAuthenticated, async (req, res, next) => {
  try {
    const allJourneys = await Journey.find();
    res.status(200).json(allJourneys);
  } catch (error) {
    next(error);
  }
});

router.get("/journey/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;

    // const oneJourney = await Journey.findById(id);

    //const theEps = await Episode.find({ belongsTo: id });
    //console.log("THEY BELONG", theEps);
    const oneJourney = await Journey.findById(id).populate("episodes");
    //.populate("Episode");
    res.status(200).json(oneJourney);
  } catch (error) {
    next(error);
  }
});

// Post /User subscriping to new Episode
router.post("/journey/:id", isAuthenticated, async (req, res, next) => {
  try {
    const currentUserId = req.payload._id;
    const journeyId = req.body.id;

    const journeyFound = await Journey.findOne({
      _id: journeyId,
      belongsTo: currentUserId,
    });

    const userFound = await User.findOne({
      _id: currentUserId,
      subscriptions: journeyId,
    });

    if (journeyFound && userFound) {
      await User.findByIdAndUpdate(currentUserId, {
        $pull: { subscriptions: journeyId },
      });
      await Journey.findByIdAndUpdate(journeyId, {
        $pull: { belongsTo: currentUserId },
      });

      const updatedJourney = await Journey.findById(journeyId).populate(
        "episodes"
      );
      res.status(200).json(updatedJourney);
    } else if (!journeyFound && !userFound) {
      await User.findByIdAndUpdate(currentUserId, {
        $push: { subscriptions: journeyId },
      });
      await Journey.findByIdAndUpdate(journeyId, {
        $push: { belongsTo: currentUserId },
      });

      const updatedJourney = await await Journey.findById(journeyId).populate(
        "episodes"
      );
      res.status(200).json(updatedJourney);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
