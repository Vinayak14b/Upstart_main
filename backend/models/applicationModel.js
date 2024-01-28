const mongoose = require("mongoose");

const Application = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    contact: { type: String, required: [true, "Please provide a contact"] },
    city: { type: String, required: [true, "Please provide a city"] },
    state: { type: String, required: [true, "Please provide a state"] },
    startupName: {
      type: String,
      required: [true, "Please provide a Startup name"],
    },
    problemSolving: {
      type: String,
      required: [true, "Please provide a problem Solving"],
    },
    startupDesc: {
      type: String,
      required: [true, "Please provide a startup descrption"],
    },
    approvalStatus: { type: String },
  },
  { collection: "applicationData" }
);

const model = mongoose.model("ApplicationData", Application);

module.exports = model;
