const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.createStartupUser = async (req, res, next) => {
  try {
    let token = req.headers.authentication;
    const verifytoken = jwt.verify(token, process.env.REACT_APP_JWT_SECRETKEY);
    if (!verifytoken)
      return res.status(401).json({ error: "Unauthorized request" });
    let dateCreated = new Date();
    await User.create({
      name: req.body.name,
      phone: req.body.phone,
      city: req.body.city,
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType,
      dateCreated: dateCreated,
    });
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.REACT_APP_GMAIL_ID ,
        pass: process.env.REACT_APP_GMAIL_PASSWORD ,
      },
    });
  
    const mailOption = {
      from: process.env.REACT_APP_GMAIL_ID,
      to: req.body.email,
      subject: `Login credentials upstart `,
      text: `Hi,${req.body.name}\n \t Welcome to Upstart family your application is accepted. So please use below login details for login in upstart and up your startup\n Username : ${req.body.email} \n Password : ${req.body.password}\n\nThankyou...!`,
    };
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent : " + info.response);
      }
      res.json({ status: "success" , message:"Email will recevied in 15min with credentials details"});
    });
  } catch (err) {
    res.status(400).json({ status: "error", error: err.message });
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Please Provide email and password" });
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(400).json({ error: "invalide credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ error: "invalide credentials" });
    }
    jwt.sign(
      { user },
      process.env.REACT_APP_JWT_SECRETKEY,
      { expiresIn: "2d" },
      (err, token) => {
        if (!err) {
          res.status(201).json({
            success: true,
            message: "user login succesful",
            userType: user.userType,
            token: token,
          });
        } else {
          res.status(500);
        }
      }
    );
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

exports.forgotPassword = async () => {
  const { email, password, confirmPassword } = req.body;
  try {
    if(password != confirmPassword){
      res.status(401).json({status:"error" , message:"Password and Confirm Password is not matching"})
    }
    await User.updateOne({ email: email }, { $set: { password: password } });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.REACT_APP_GMAIL_ID ,
        pass: process.env.REACT_APP_GMAIL_PASSWORD ,
      },
    });
  
    const mailOption = {
      from: process.env.REACT_APP_GMAIL_ID,
      to: req.body.email,
      subject: `Login credentials upstart `,
      text: `Hi,${req.body.name}\n \t Password has been successfully changed `,
    };
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent : " + info.response);
      }
      res.status(200).json({ status: "success" , message:"Password has been successfully changed"});
    });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

exports.deleteUser = async (req,res) => {
  const { email} = req.body;
  try {
    const user = await User.findOne({email: email});
    if(!user){
      res.status(401).json({status:"error" , message:"No user is present"})
    }
    await User.deleteOne({ email: email })
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

exports.contactus = async (req,res) => {
  const {name, email ,message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.REACT_APP_GMAIL_ID ,
        pass: process.env.REACT_APP_GMAIL_PASSWORD ,
      },
    });
  
    const mailOption = {
      from: process.env.REACT_APP_GMAIL_ID ,
      to: process.env.REACT_APP_GMAIL_ID,
      subject: `Message from ${name} ,${email} `,
      text: message,
    };
    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent : " + info.response);
      }
      res.status(200).json({ status: "success" , message:"Email has been send"});
    });

  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

