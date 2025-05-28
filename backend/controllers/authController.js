const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  validateRegisterUser,
  User,
  validateLoginUser,
} = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

/**********************************************
 * @desc      Register New User
 * @route     /api/auth/register
 * @method    POST
 * @access    public
 *********************************************/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  // validation
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // is user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user and save it to DB
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  // creating new verificationToken and save it to db
  const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationToken.save();

  // making the link
  const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

  // putting the link into an html template
  const htmlTemplate = `<div>
                          <p>Click on the link below to verify your email</p>
                          <a href="${link}">Verify</a>
                        </div>`;

  // sending email to the user
  await sendEmail(user.email, "Verify Your Email", htmlTemplate);

  // send res to client
  res.status(201).json({
    message: "We sent to you an email, please verify your email address",
  });
});

/**********************************************
 * @desc      Login User
 * @route     /api/auth/login
 * @method    POST
 * @access    public
 *********************************************/
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  // validation
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // is user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password!" });
  }

  //check the password
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password!" });
  }

  // sending email (verify account if not verified)
  if (!user.isAccountVerified) {
    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });

    if (!verificationToken) {
      verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await verificationToken.save();
    }

    const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

    const htmlTemplate = `<div>
                          <p>Click on the link below to verify your email</p>
                          <a href="${link}">Verify</a>
                        </div>`;

    await sendEmail(user.email, "Verify Your Email", htmlTemplate);

    return res.status(400).json({
      message: "We sent to you an email, please verify your email address",
    });
  }

  // generate token (jwt)
  const token = user.generateAuthToken();

  // response to client
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
    username: user.username,
  });
});

/**********************************************
 * @desc      Verify User Account
 * @route     /api/auth/:userId/verify/:token
 * @method    GET
 * @access    public
 *********************************************/
module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "Invalid link!" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid link!" });
  }

  user.isAccountVerified = true;
  await user.save();

  await VerificationToken.findByIdAndDelete(verificationToken._id);
  res.status(200).json({ message: "Your account verified" });
});
