const { BadrequestError } = require("../errors/errors");
const passport = require("passport");
const User = require("../models/User");
const jsonwebtoken = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const userLogin = async (req, res, next) => {
  passport.authenticate("login", async (err, user) => {
    try {
      if (err || !user) {
        const error = new BadrequestError(
          "no user found please register as a user"
        );
        next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const token = jsonwebtoken.sign(
          {
            user: { _id: user._id, email: user.email },
          },
          process.env.JWT_APP_SECRET,
          {
            expiresIn: process.env.JWT_SECRET_EXPIRATION,
          }
        );
        res.status(200).json({
          message: "user logged in successfully",
          token,
        });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

const singleUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username }).populate(
    "following",
    "-password"
  );
  if (!user) {
    throw new BadrequestError("failed to find user");
  }
  res.status(StatusCodes.OK).json(user);
};

const followUser = async (req, res, next) => {
  const userByUsername = await User.findOne({ username: req.params.username });
  if (userByUsername) {
    if (userByUsername._id.toString() === req.body.followId) {
      throw new BadrequestError("you cannot follow yourself");
    }
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      {
        $addToSet: { following: req.body.followId },
      }
    );
    if (!user) throw BadrequestError("failed to add to the list of following");
    const newFollowing = await User.findById(req.body.followId);
    res.status(StatusCodes.OK).json({
      message: `${newFollowing?.username} added to the list of following`,
    });
  }
};

const unFollowUser = async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { username: req.params.username },
    {
      $pull: { following: req.body.followId },
    }
  );
  if (!user)
    throw BadrequestError("failed to remove from the list of your following");
  const newFollowing = await User.findById(req.body.followId);
  res.status(StatusCodes.OK).json({
    message: `${newFollowing?.username} removed from the list of your following`,
  });
};

const userfollowings = async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).populate(
    "following",
    "-password"
  );
  if (!user) {
    throw new BadrequestError("failed to find user following");
  }
  res.status(StatusCodes.OK).json(user.following);
};

const userfollowers = async (req, res) => {
  const userByUsername = await User.findOne({ username: req.params.username });
  if (!userByUsername) throw new BadrequestError("No user by this username");
  const user = await User.find({ following: { $all: [userByUsername._id] } });
  if (!user) {
    throw new BadrequestError("failed to find user followers");
  }
  res.status(StatusCodes.OK).json(user);
};

module.exports = {
  userLogin,
  singleUser,
  followUser,
  unFollowUser,
  userfollowings,
  userfollowers,
};
