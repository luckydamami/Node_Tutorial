const express = require("express");
const Person = require("../models/person");
const { generateToken, jwtAuthMiddleware } = require("../jwt");

const personRouter = express.Router();

//user signup route
personRouter.post("/signup", async (req, res) => {
  try {
    const personObj = new Person(req.body);
    const response = await personObj.save();
    console.log("Successfully Signed Up!");

    let payload = {
      id: response.id,
      username: response.username,
    };

    const token = generateToken(payload);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log("Oops! error was occured!", error);
    res.status(500).json({ error: "An server error occured!" });
  }
});

personRouter.post("/login", async (req, res) => {
  try {
    //extract the username and password from req body
    const { username, password } = req.body;

    //check the details in db
    const user = await Person.findOne({ username: username });
    if (!user || !(await user.comparePassword(password)))
      res.status(401).json({ error: "Invalid username and password!" });

    const payload = {
      id: user.id,
      username: user.username,
    };
    //generate the token
    const token = generateToken(payload);
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Internal server error!" });
  }
});

personRouter.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("userData is : ", userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "user not found!" });
  }
});

// Get method route for the get persons
personRouter.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const info = await Person.find();
    console.log("Your data is Get ready!");
    res.status(200).json(info, req.url);
  } catch (error) {
    console.log("Oops! error was occured!", error);
    res.status(500).json({ error: "An server error occured!" });
  }
});

personRouter.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //url me jo bhi peramter ki value aayegi usko extract karta hai
    if (
      workType == "chef" ||
      workType == "manager" ||
      workType == "waiter" ||
      workType == "owner"
    ) {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json("Invalid work type");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

personRouter.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const personData = req.body;

    const updatedPerson = await Person.findByIdAndUpdate(personId, personData, {
      new: true, //Return the updated document
      runValidators: true, //Run Mongoose Validations
    });
    if (!updatedPerson) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("Data was updated");
    res.status(200).json(updatedPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

personRouter.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("Data was Deleted!");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = personRouter;
