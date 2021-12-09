const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const episodeSchema = new Schema({
  belongsTo: { type: Schema.Types.ObjectId, ref: "Journey" },
  audioUrl: { type: String, required: true },
  description: { type: String },
  notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
  hasFinished: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = model("Episode", episodeSchema);
