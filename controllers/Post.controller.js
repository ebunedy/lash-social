const Post = require("../models/Post");
const { BadrequestError } = require("../errors/errors");
const { StatusCodes } = require("http-status-codes");

const creatPost = async (req, res, next) => {
  const { title, desc, image } = req.body;
  if (!title || !desc) {
    throw new BadrequestError("please provide a title and desc");
  }
  const post = await Post.create({ title, desc, image, user: req.user._id });
  if (!post) throw new BadrequestError("failed to create post");
  res.status(StatusCodes.OK).json(post);
};

const viewPost = async (req, res) => {
  const post = await Post.findById(req.params.postId).populate(
    "user",
    "-password"
  );
  if (!post) throw new BadrequestError("no such post");
  res.status(StatusCodes.OK).json(post);
};

module.exports = {
  creatPost,
  viewPost,
};
