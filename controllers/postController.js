const Post = require("../model/post")

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.create_post_get = (req,res,next)=>{
    res.render("create_post_form",{user:req.user})
}

exports.create_post_post = [
    body("title", "Inconrrect Title")
    .trim()
    .isLength({min:1 ,max:100})
    .escape(),

    asyncHandler(async (req,res,next) =>{
        const errors = validationResult(req);
        console.log(req.user);
        if(!errors.isEmpty()){
            res.render("create_post_form", {
                user: req.user,
                errors: errors.array(),
            });
            return;
        }else{
            const post = new Post({
                title: req.body.title,
                text: req.body.text,
                timeStamp: new Date(),
                author: req.user._id
            })

            await post.save()
            res.redirect(post.url)
        }
    })
]