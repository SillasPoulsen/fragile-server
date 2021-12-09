const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const journeySchema = new Schema({
  belongsTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
  name: { type: String },
  feeling: {
    type: String,
    enum: ["Stress", "Anxiety", "Depression", "Happiness"],
  },
  episodes: [{ type: Schema.Types.ObjectId, ref: "Episodes" }],
});

module.exports = model("Journey", journeySchema);
