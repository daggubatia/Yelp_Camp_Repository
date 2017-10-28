var express        = require("express"),
    router         = express.Router(),
    User           = require("../models/user"),
    passport       = require("passport");

// Landing Home page
router.get("/", function(req, res){
    res.render("landing");
});
// redering the registration form
router.get("/register", function(req, res){
   res.render("register"); 
});
//registering the user in the DB and redirecting to campgrounds page===========
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err){
            console.log(err);
            req.flash("error", err.message);
            //return res.redirect("/register");//need to chk this too to know the difference between redirecting and rendering in a function return statement
            return res.redirect("/register");
        }
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect("/campgrounds");
            });
    });
});
// redering the login form===================
router.get("/login", function(req, res){
   res.render("login"); 
});
//Handling login logic here========First Type=================
// router.post("/login", passport.authenticate("local", {
//     successRedirect: "/campgrounds",
//     failureRedirect: "/login",
//     failureFlash: true,
//     successFlash: "Welcome!"
// }) ,function(req, res){
// });
//Handling login logic here========Second Type==================
router.post("/login", passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}) ,function(req, res){
    req.flash("success", "Welcome " + req.user.username);
    res.redirect("/campgrounds");
});
// Handling the logout logic here==============
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You Successfully Logged Out...");
    res.redirect("/login");
});

module.exports = router;