
const User = require("../model/user")
const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


exports.sign_up_get = (req,res,next)=>{
    res.render("sign_up")
}
exports.sign_up_post = [
    body("first_name","invalid Name")
    .trim()
    .isLength({ min: 1 , max:100})
    .escape(),
    body("last_name","invalid Name")
    .trim()
    .isLength({ min: 1 , max:100})
    .escape(),
    body("username","invalid username")
    .trim()
    .isEmail()
    .withMessage("invalid email address")
    .isLength({ min: 1 , max:100})
    .escape(),
    body("password", "invalid password")
    .trim()
    .isLength({min:1, max:100})
    .escape(),
    body("password_repeat")
    .custom((value, { req }) => {
        return value === req.body.password;
      })
    .withMessage("passwords not concide"),
    asyncHandler(async(req,res,next) =>{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render("sing_up", {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username:req.body.username,
                errors: errors.array(),
            });
            return;
          } else {
            const hashedPassword = bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                // if err, do something
                if (err){
                    res.render("sing_up", {errors:["invalid Password"]})
                    return;
                }else {
                    const user = new User({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username:req.body.username,
                        password:hashedPassword,
                        membership_status: "Unregistered",
                    })
                    const userExists = await User.findOne({ username: req.body.username, password:hashedPassword }).exec();
                    if (userExists) {
                        res.render("sing_up", {
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            username:req.body.username,
                            errors: ["invalid Password"],
                        });
                    } else {
                      await user.save();
                      // New genre saved. Redirect to genre detail page.
                      res.redirect("/membership")
                    }
                } 
            })
        }
})]
exports.membership_get = (req, res, next) => {
    console.log(req.user);
    res.render("member_form")
}

exports.membership_post =[]

exports.log_in_get = (req,res,next) =>{
    res.render("log_in")
}

exports.home_get = (req,res,next) =>{
    res.render("home", {user:req.user})
}

exports.home_post = [
    body("member_code","invalid Code")
    .trim()
    .isLength({ min: 1 , max:100})
    .escape(),
    asyncHandler(async(req,res,next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render("home", {
                user: req.user,
                errors: errors.array(),
            });
        }else{
            const match = req.body.member_code === "Yes"
            if(match){
                // update member status
                console.log("entering");
                await User.findByIdAndUpdate(req.user._id, {membership_status: "Registered"});
                res.redirect("/home")
            }else{

                console.log("failed");
                res.render("home", {
                    user: req.user,
                    errors: [{msg:"Invalid Code"}],
                });
            }
        }
    })
]