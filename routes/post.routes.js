const router = require("express").Router();
const { creatPost, viewPost } = require("../controllers/Post.controller");
const passport = require("passport");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  creatPost
);

router.get("/:postId", viewPost);

module.exports = router;
