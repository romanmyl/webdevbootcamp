var express     = require("express");
var User        = require("../models/user");
var passport    = require("passport");
var router      = express.Router();

// Root route
router.get("/", function(req, res){
    res.render("landing");
});

//  Show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//  Handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register", {error: err.message});
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Successfully Signed Up! Nice to meet you " + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

//  Show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});
//  Handling login logic 
//  app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//  Logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;