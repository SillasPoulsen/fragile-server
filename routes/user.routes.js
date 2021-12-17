const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");

// GET /api/users/current  - Get current user info
router.get("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const user = await User.findById(currentUser._id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// Get users subsciptions
router.get(
  "/api/users/subscriptions",
  isAuthenticated,
  async (req, res, next) => {
    try {
      console.log(req.payload);
      const currentUserId = req.payload._id;

      const userObj = await User.findById(currentUserId).populate(
        "subscriptions"
      );
      const userSubscriptions = userObj.subscriptions;

      res.status(200).json(userSubscriptions);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/api/users/hasDone", isAuthenticated, async (req, res, next) => {
  try {
    console.log(req.payload);
    const currentUserId = req.payload._id;

    const userObj = await User.findById(currentUserId);

    const userSubscriptions = userObj.hasDone;

    res.status(200).json(userSubscriptions);
  } catch (error) {
    next(error);
  }
});

//To get alle the info about the user for the profile page.
router.get("/api/users/allinfo", isAuthenticated, async (req, res, next) => {
  try {
    console.log(req.payload);
    const currentUserId = req.payload._id;

    const userObj = await User.findById(currentUserId)
      .populate("subscriptions")
      .populate("hasDone");

    res.status(200).json(userObj);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/current  - Update the current user
router.put("/api/users/current", isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const { email, name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { email, name },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
