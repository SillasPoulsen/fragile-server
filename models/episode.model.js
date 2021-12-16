const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const episodeSchema = new Schema(
  {
    belongsTo: { type: Schema.Types.ObjectId, ref: "Journey" },
    audioUrl: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
  },
  {
    strictPopulate: false,
  }
);

module.exports = model("Episode", episodeSchema);
