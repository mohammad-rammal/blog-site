const mongoose = require("mongoose");
const Joi = require("joi");

// Comment Schema
const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Comment Model
const Comment = mongoose.model("Comment", CommentSchema);

// Validate Create Comment
function validateCreateComment(data) {
  const schema = Joi.object({
    postId: Joi.string().required().label("Post ID"),
    text: Joi.string().trim().required(),
  });
  return schema.validate(data);
}

// Validate Update Comment
function validateUpdateComment(data) {
  const schema = Joi.object({
    text: Joi.string().trim().required(),
  });
  return schema.validate(data);
}

module.exports = {
  Comment,
  validateCreateComment,
  validateUpdateComment,
};
