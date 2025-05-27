const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveMultipleImage,
} = require("../utils/cloudinary");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");

/**********************************************
 * @desc      Get All Users Profile
 * @route     /api/users/profile
 * @method    GET
 * @access    private (only admin)
 *********************************************/
module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("posts");
  res.status(200).json(users);
});

/**********************************************
 * @desc      Get User Profile
 * @route     /api/users/profile/:id
 * @method    GET
 * @access    public
 *********************************************/
module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("posts");
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  res.status(200).json(user);
});

/**********************************************
 * @desc      Update User Profile
 * @route     /api/users/profile/:id
 * @method    PUT
 * @access    private (only user himself)
 *********************************************/
module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
  // validate
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // if change password
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  // set new updated user data
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(updatedUser);
});

/**********************************************
 * @desc      Get Users Count
 * @route     /api/users/count
 * @method    GET
 * @access    private (only admin)
 *********************************************/
module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

/**********************************************
 * @desc      Profile Photo Upload
 * @route     /api/users/profile/profile-photo-upload
 * @method    POST
 * @access    private (only logged in user)
 *********************************************/
module.exports.profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
  // 1- validation
  if (!req.file) {
    return res.status(400).json({ message: " No file provided!" });
  }

  // 2- get the path to the image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  // 3- upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);

  // 4- get the user from DB
  const user = await User.findById(req.user.id);

  // 5- delete the old profile photo if exist
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  // 6- change the profile photo field in the DB
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();

  // 7- send res to client
  res.status(200).json({
    message: "Successfully uploaded your new profile photo",
    profilePhoto: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  // 8- remove image from server
  fs.unlinkSync(imagePath);
});

/**********************************************
 * @desc      Delete User Profile (Account)
 * @route     /api/users/profile/:id
 * @method    DELETE
 * @access    private (only admin or user himself)
 *********************************************/
module.exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  // 1- get the user from DB
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  // 2- get all posts from DB
  const posts = await Post.find({ user: user._id });

  // 3- get the public ids from the posts
  const publicIds = posts?.map((post) => post.image.publicId);

  // 4- delete all posts image from cloudinary that belong to this user
  if (publicIds?.length > 0) {
    await cloudinaryRemoveMultipleImage(publicIds);
  }

  // 5- delete the profile picture from cloudinary
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  // 6- delete user posts
  if (posts.length > 0) {
    await Post.deleteMany({ user: user._id });
  }

  // 7- delete user comments
  const commentCount = await Comment.countDocuments({ user: user._id });
  if (commentCount > 0) {
    await Comment.deleteMany({ user: user._id });
  }

  // 8- delete the user himself
  await User.findByIdAndDelete(req.params.id);

  // 9- send a response to the client
  res.status(200).json({ message: "Your profile has been deleted" });
});
