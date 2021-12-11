const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const noteSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  episode: { type: Schema.Types.ObjectId, ref: "Episode" },
  textInput: { type: String },
  scaleInput: { type: String },
  public: { type: Boolean },
  upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = model("Note", noteSchema);
