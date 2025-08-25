const mongoose = require("mongoose");
const becrypt = require("bcrypt");

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

personSchema.pre("save", async (next) => {
  const person = this;
  try {
    //Hash the password only if it has been modified (or is new)
    if (!person.isModified("password")) return next();

    //hash password generation process
    const salt = await becrypt.genSalt(10);
    const hashPassword = await becrypt.hash(person.password, salt);
    person.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const Person = new mongoose.model("Person", personSchema);
module.exports = Person;
