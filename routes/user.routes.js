const router = require("express").Router();
const passport = require("passport");
const {
  userLogin,
  singleUser,
  followUser,
  unFollowUser,
  userfollowings,
  userfollowers,
} = require("../controllers/User.controller");

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({ user: req.user.username });
  }
);

router.post("/login", userLogin);
router.get("/:username", singleUser);
router.get("/:username/following", userfollowings);
router.get("/:username/followers", userfollowers);
router.post(
  "/:username/follow",
  passport.authenticate("jwt", { session: false }),
  followUser
);
router.delete(
  "/:username/follow",
  passport.authenticate("jwt", { session: false }),
  unFollowUser
);

module.exports = router;
