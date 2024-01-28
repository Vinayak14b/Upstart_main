const express = require("express");
const router = express.Router();
const { createStartupUser, login ,forgotPassword,deleteUser ,contactus} = require("../controllers/authController");
const {
  applyApplication,
  sendApplication,
  sendFundApplication,
  updateApprovalStatus,
  fetchApplications,
  findFundRequest,
  findUser,
} = require("../controllers/dataController");

router.route("/auth/login").post(login);
router.route("/auth/forgotPassword").put(forgotPassword);
router.route("/auth/createStartupUser").post(createStartupUser);
router.route("/applyApplication").post(applyApplication);
router.route("/sendApplication").post(sendApplication);
router.route("/sendFundApplication").post(sendFundApplication);
router.route("/updateApprovalStatus").put(updateApprovalStatus);
router.route("/fetchApplications").get(fetchApplications);
router.route("/findFundRequest").post(findFundRequest);
router.route("/findUser").post(findUser);
router.route("/deleteUser").delete(deleteUser);
router.route("/contactus").post(contactus);


module.exports = router;
