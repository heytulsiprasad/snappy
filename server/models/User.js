const mongoose = require("mongoose");

// Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
});

// Remove security fields before sending over API
UserSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["__v"];
    delete ret["password"];
    return ret;
  },
});

// Add index to schema
// UserSchema.index({ name: "text", email: "text" });

const User = mongoose.model("user", UserSchema);

module.exports = User;
