const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const journeySchema = new Schema(
  {
    belongsTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
    name: { type: String },
    feeling: {
      type: String,
      enum: ["Stress", "Anxiety", "Depression", "Happiness"],
    },
    description: { type: String },
    episodes: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
  },
  {
    strictPopulate: false,
  }
);

module.exports = model("Journey", journeySchema);
