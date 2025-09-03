const express = require("express");
const personModel = require("../models/person");
const personRouter = express.Router();

//-------------- Data Create Operation ---------------
personRouter.post("/", async (req, res) => {
  try {
    const personData = req.body;
    const personObj = new personModel(personData);
    const response = await personObj.save();
    console.log("Data Added Successfully!");
    res.status(200).json(response);
  } catch (error) {
    console.log("Oops! error was occured!", error);
    res.status(500).json({ error: "An server error occured!" });
  }
});

//------------- Data Read Operation --------------
personRouter.get("/", async (req, res) => {
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
