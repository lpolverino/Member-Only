var express = require('express');
var router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController")
const postController = require("../controllers/postController")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/sign-up", userController.sign_up_get)

router.post("/sign-up", userController.sign_up_post)


router.get("/log-in", userController.log_in_get)
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/membership",
    failureRedirect: "/"
  })
);

router.get("/membership", userController.member_get)
router.post("/membership", userController.member_post)


router.get("/home", userController.home_get)

router.get("/post/create", postController.create_post_get)
router.post("/post/create", postController.create_post_post)

module.exports = router;
