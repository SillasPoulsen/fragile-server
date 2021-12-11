const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, default: "https://i.imgur.com/yWHfhiG.png" },
  subscriptions: [{ type: Schema.Types.ObjectId, ref: "Journey" }],
  hasDone: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
});

module.exports = model("User", userSchema);
