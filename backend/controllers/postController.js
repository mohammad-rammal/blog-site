const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const {
  validateCreatePost,
  Post,
  validateUpdatePost,
} = require("../models/Post");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const { Comment } = require("../models/Comment");

/**********************************************
 * @desc      Create New Post
 * @route     /api/posts
 * @method    POST
 * @access    private (only logged in user)
 *********************************************/
module.exports.createPostCtrl = asyncHandler(async (req, res) => {
  // 1- validation for image
  if (!req.file) {
    return res.status(400).json({ message: "No image provided!" });
  }

  // 2- validation for data
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // 3- upload photo
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // 4- create new post and save it to DB
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });
  // const post1 = new Post({
  //   title: req.body.title,
  // });
  // await post1.save;

  // 5- send response to the client
  res.status(201).json(post);

  // 6- remove image from the server
  fs.unlinkSync(imagePath);
});

/**********************************************
 * @desc      Get All Posts
 * @route     /api/posts
 * @method    GET
 * @access    public
 *********************************************/
module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 3;
  const { pageNumber, category } = req.query;
  let posts;

  if (pageNumber) {
    posts = await Post.find()
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (category) {
    posts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }

  res.status(200).json(posts);
});

/**********************************************
 * @desc      Get Single Post
 * @route     /api/posts/:id
 * @method    GET
 * @access    public
 *********************************************/
module.exports.getSinglePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", ["-password"])
    .populate("comments");

  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  res.status(200).json(post);
});

/**********************************************
 * @desc      Get Posts Count
 * @route     /api/posts/count
 * @method    GET
 * @access    public
 *********************************************/
module.exports.getPostCountCtrl = asyncHandler(async (req, res) => {
  const count = await Post.countDocuments();

  res.status(200).json(count);
});

/**********************************************
 * @desc      Delete Post
 * @route     /api/posts/:id
 * @method    Delete
 * @access    private (only admin or owner of the post)
 *********************************************/
module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(post.image.publicId);

    // delete all comments that belong to this post
    await Comment.deleteMany({ postId: post._id });

    res.status(200).json({
      message: "Post has been deleted successfully",
      title: post.title,
      postId: post._id,
    });
  } else {
    res.status(403).json({
      message: "Access denied, forbidden!",
    });
  }
});

/**********************************************
 * @desc      Update Post
 * @route     /api/posts/:id
 * @method    PUT
 * @access    private (only owner of the post)
 *********************************************/
module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  // 1- validation
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // 2- get the post from DB and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  // 3- check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "Access denied, your are not allowed!" });
  }

  // 4- update post
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  )
    .populate("user", ["-password"])
    .populate("comments");

  // 5- send response to the client
  res.status(200).json(updatedPost);
});

/**********************************************
 * @desc      Update Post Image
 * @route     /api/posts/upload-image/:id
 * @method    PUT
 * @access    private (only owner of the post)
 *********************************************/
module.exports.updatePostImageCtrl = asyncHandler(async (req, res) => {
  // 1- validation
  if (!req.file) {
    return res.status(400).json({ message: "No image provided!" });
  }

  // 2- get the post from DB and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  // 3- check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "Access denied, your are not allowed!" });
  }

  // 4- delete the old image
  await cloudinaryRemoveImage(post.image.publicId);

  // 5- upload new photo
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // 6- update image field in DB
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );

  // 7- send response to the client
  res.status(200).json(updatedPost);

  // 8- remove image from the server
  fs.unlinkSync(imagePath);
});

/**********************************************
 * @desc      Toggle Like
 * @route     /api/posts/like/:id
 * @method    PUT
 * @access    private (only logged in user)
 *********************************************/
module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  // 1- get the post from DB and check if post exist
  const { id: postId } = req.params;
  let post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  // 2- check if this logged in user is in likes array
  const loggedInUser = req.user.id;
  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === loggedInUser
  );
  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        // pull just for arrays // pull to remove from array
        $pull: {
          likes: loggedInUser,
        },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        // push just for arrays // push to add to array
        $push: {
          likes: loggedInUser,
        },
      },
      { new: true }
    );
  }

  // 3- send response to the client
  res.status(200).json(post);
});
