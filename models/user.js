const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    age: {
      type: Number,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
