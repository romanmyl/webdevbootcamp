var express = require("express");
var Campground = require("../models/campground");
var router  = express.Router();

// INDEX - show all campgrounds
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

// CREATE - add new campground to DB (Create ROUTE)
router.post("/", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           //redirrect back to campgrounds page;
           res.redirect("/campgrounds");
       }
    });
});

// NEW - show form to create new campgrounds
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more information about one campground
router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        } else {
            console.log("foundCampground");
            // Render show template with that campground
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

module.exports = router;