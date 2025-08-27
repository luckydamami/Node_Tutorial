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
    enum: ["chef", "owner", "manager", "waiter"],
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
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  if (!this.isModified("password")) return next();
  try {
    //generate salt for the hash password
    const salt = await bcrypt.genSalt(10);
    //transform the plain password to hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;
    next(); //next callback message is process is complete and now save the database
  } catch (error) {
    next(error);
  }
});

personSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatchPassword = await bcrypt.compare(
      userPassword, //candidate password = user plain password for login time
      this.password //access the database hashed password
    );
    return isMatchPassword;
  } catch (error) {
    throw error;
  }
};

const Person = new mongoose.model("Person", personSchema);
module.exports = Person;
