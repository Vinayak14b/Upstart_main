const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Application = require("../models/applicationModel");
const FundApplication= require("../models/fundApplicationModel");

exports.applyApplication = (req, res, next) => {
  try {
    //code

    res.json({ status: "ok" });
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
};
exports.sendApplication = async (req, res, next) => {
  try {
    await Application.create({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      city: req.body.city,
      state: req.body.state,
      startupName: req.body.startupName,
      problemSolving: req.body.problemSolving,
      startupDesc: req.body.startupDesc,
      approvalStatus: req.body.approvalStatus,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
};
exports.sendFundApplication = async (req, res, next) => {
  try {
    let token = req.headers.authentication;
    const verifytoken = jwt.verify(token, process.env.REACT_APP_JWT_SECRETKEY);
    if (!verifytoken)
      return res.status(401).json({ error: "Unauthorized request" });

    await FundApplication.create({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      startupName: req.body.startupName,
      fundsRequired: req.body.fundsRequired,
      reason: req.body.reason,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
};
exports.updateApprovalStatus = async (req, res, next) => {
  try {
    let token = req.headers.authentication;
    const verifytoken = jwt.verify(token, process.env.REACT_APP_JWT_SECRETKEY);
    if (!verifytoken)
      return res.status(401).json({ error: "Unauthorized request" });
    
    let status = req.body.status;
    let email = req.body.email;
    await Application.updateOne(
      { email: email },
      { $set: { approvalStatus: status } }
    );

    res.json({ status: "ok" });
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
};
exports.fetchApplications = async (req, res, next) => {
  try {
    let token = req.headers.authentication;
    const verifytoken = jwt.verify(token, process.env.REACT_APP_JWT_SECRETKEY);
    if (!verifytoken)
      return res.status(401).json({ error: "Unauthorized request" });

    const applications = await Application.find();
    if (applications) {
      res.json({ status: "ok", applications: applications });
    } else {
      res.status(400).json({ message: "No application exist" });
    }
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
};
exports.findFundRequest = async (req, res, next) => {
  try {
    let token = req.headers.authentication;
    const verifytoken = jwt.verify(token, process.env.REACT_APP_JWT_SECRETKEY);
    if (!verifytoken)
      return res.status(401).json({ error: "Unauthorized request" });
      
    const email = req.body.email;
    const userLogin = await FundApplication.find({ email: email });
    if (userLogin) {
      res.json({ status: "ok", user: userLogin });
    } else {
      res.status(400).json({ message: "No user exist" });
    }
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
};
exports.findUser = async (req, res, next) => {
  try {
    let token = req.headers.authentication;
    const verifytoken = jwt.verify(token, process.env.REACT_APP_JWT_SECRETKEY);
    if (!verifytoken)
      return res.status(401).json({ error: "Unauthorized request" });

    const email = req.body.email;
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      res.json({ status: "ok", user: userLogin });
    } else {
      res.status(400).json({ message: "No user exist" });
    }
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
};
