var express = require('express');
var router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/sign-up", userController.sign_up_get)

router.post("/sign-up", userController.sign_up_post)

router.get("/membership", userController.membership_get)

router.get("/log-in", userController.log_in_get)
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
);

router.get("/home", userController.home_get)
router.post("/home", userController.home_post)

module.exports = router;
