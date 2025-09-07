const express = require("express");
const personModel = require("../models/person");
const personRouter = express.Router();
const { generateToken, jwtAuthMiddleware } = require("../jwt");

//-------------- Data Create Operation ---------------
personRouter.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const personObj = new personModel(user);
    const response = await personObj.save();
    console.log("Data Added Successfully!");

    const payload = {
      id: user.id,
      username: user.username,
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
    //extract the user data from req body
    const { username, password } = req.body;

    //fetch tha document from database
    const user = await personModel.findOne({ username });

    //check user credientials
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: "Invalid username and password" });

    //genrate the Token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

personRouter.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await personModel.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

//------------- Data Read Operation --------------
personRouter.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const response = await personModel.find();
    console.log("Read Your Data!");
    res.status(200).json(response);
  } catch (error) {
    console.log("Oops! error was occured!", error);
    res.status(500).json({ error: "An server error occured!" });
  }
});

//----------- Perameterise routing -----------
personRouter.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //url me jo bhi peramter ki value aayegi usko extract karta hai
    if (
      workType == "chef" ||
      workType == "manager" ||
      workType == "waiter" ||
      workType == "owner" ||
      workType == "accounted"
    ) {
      const response = await personModel.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json("Invalid work type");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//------ Data Update Operation ----------
personRouter.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const personData = req.body;

    const updatedPerson = await personModel.findByIdAndUpdate(
      personId,
      personData,
      {
        new: true, //Return the updated document
        runValidators: true, //Run Mongoose Validations
      }
    );
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

// ---------- Data Delete Operation -------------
personRouter.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await personModel.findByIdAndDelete(personId);
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
