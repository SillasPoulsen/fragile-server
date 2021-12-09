const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Journey = require("../models/journey.model");

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

// Post /User subscriping to new Episode
router.post("/journey/:id", isAuthenticated, async (req, res, next) => {
  try {
    const currentUserId = req.payload._id;
    const journeyId = req.params;

    const userObj = await User.findByIdAndUpdate(currentUserId, {
      $push: { subscriptions: journeyId },
    });

    res.status(200).json(userObj);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
