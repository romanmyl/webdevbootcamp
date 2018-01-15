var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

// Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    //FIND CAMPGROUND BY ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           //create new comment
           Comment.create(req.body.comment, function(err, comment){
               if(err) {
                   console.log(err);
               } else {
                  //add user and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save new comment 
                  comment.save();
                  //connect new comment to campground
                  campground.comments.push(comment);
                  campground.save();
                  //redirect campground show page
                  res.redirect('/campgrounds/' + campground._id);
               }
           });
       }
    });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            // this code line I added by myself for ability to add campgoround_name to the edit.ejs form
            Campground.findById(req.params.id, function(err, foundCamp){
                res.render("comments/edit", 
                {
                    campground_id: foundCamp.id, 
                    campground_name: foundCamp.name, 
                    comment: foundComment
                });
            });
        }
    });
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});


module.exports = router;