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
});

// Remove security fields before sending over API
UserSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["__v"];
    delete ret["password"];
    return ret;
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
