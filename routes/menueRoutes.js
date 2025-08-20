const express = require("express");
const Menue = require("../models/menue");

const menueRouter = express.Router();

menueRouter.post("/", async (req, res) => {
  try {
    const firstMenue = new Menue(req.body);
    const response = await firstMenue.save();
    console.log("menue data is saved on database!");
    res.status(200).json(response);
  } catch (error) {
    console.log("Oops! error was occured! ", error);
    res.status(500).json({ error: "An server error occured!" });
  }
});

menueRouter.get("/", async (req, res) => {
  try {
    const response = await Menue.find();
    res.status(200).json(response);
  } catch (error) {
    console.log("Oops! error was occured! ", error);
    res.status(500).json({ error: "An server error occured!" });
  }
});

menueRouter.get("/:tastType", async (req, res) => {
  try {
    const tastType = req.params.tastType;

    if (tastType == "spicy" || tastType == "sweet" || tastType == "sour") {
      const response = await Menue.find({ taste: tastType });
      res.status(200).json(response);
    } else {
      console.log("Internal server error");
    }
  } catch (error) {
    console.log("Oops! error was occured!", error);
    res.status(500).json({ error: "An server error occured!" });
  }
});

menueRouter.put("/:menueId", async (req, res) => {
  try {
    const menueId = req.params.menueId;
    const menueData = req.body;

    const updateMenue = await Menue.findByIdAndUpdate(menueId, menueData, {
      new: true, //return the updated doucment
      runValidators: true, //run mongoose validations
    });

    if (!updateMenue) {
      return res.status(404).json("Menue Not Found");
    }

    console.log("Menue Updated Successfully!");
    res.status(200).json(updateMenue);
  } catch (error) {
    console.log("Oops! error was occured!", error);
    res.status(500).json({ error: "An server error occured!" });
  }
});

menueRouter.delete("/:menueId", async (req, res) => {
  try {
    const menueId = req.params.menueId;

    const response = await Menue.findByIdAndDelete(menueId);

    if (!response) {
      return res.status(404).json("Menue Not Found");
    }

    console.log("Menue Updated Successfully!");
    res.status(200).json(response);
  } catch (error) {
    console.log("Oops! error was occured!", error);
    res.status(500).json({ error: "An server error occured!" });
  }
});

module.exports = menueRouter;
