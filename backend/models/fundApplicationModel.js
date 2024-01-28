const mongoose = require("mongoose");

const FundApplication = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    email: { type: String, required: [true, "Please provide a email"] },
    contact: { type: String, required: [true, "Please provide a contact"] },
    startupName: {
      type: String,
      required: [true, "Please provide a startup Name"],
    },
    fundsRequired: {
      type: Number,
      required: [true, "Please provide a fund Required"],
    },
    reason: { type: String, required: [true, "Please provide a reason"] },
  },
  { collection: "fundApplicationData" }
);

const model = mongoose.model("FundApplicationData", FundApplication);

module.exports = model;
