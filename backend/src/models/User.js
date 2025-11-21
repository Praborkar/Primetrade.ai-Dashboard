const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    // ★ OPTIONAL PROFILE FIELDS ★
    phone: { type: String, default: "" },

    location: { type: String, default: "" },

    bio: { type: String, default: "" },

    photo: { type: String, default: "" },  // stores filename or URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
