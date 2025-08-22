const express = require("express");
const Person = require("./../models/person");

const personRouter = express.Router();

personRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const personObj = new Person(data);
    const response = await personObj.save();
    console.log("Person Data was saved!");
    res.status(200).json(response);
  } catch (error) {
    console.log("Oops! error was occured!", error);
    res.status(500).json({ error: "An server error occured!" });
  }
});

personRouter.get("/", async (req, res) => {
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
