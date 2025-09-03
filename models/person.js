const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "owner", "manager", "waiter", "accounted"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

personSchema.pre("save", async (next) => {
  const person = this;
  if (!person.isModified(password)) return next();
  try {
    //genrate the salt for password
    const salt = await bcrypt.genSalt(15);
    //hashing the normal password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

personSchema.methods.comparePassword = async (userPassword) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
const personModel = new mongoose.model("personModel", personSchema);
module.exports = personModel;
