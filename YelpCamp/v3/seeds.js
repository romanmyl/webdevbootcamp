var mongoose        = require("mongoose");
var Campground      = require("./models/campground");
var Comment         = require("./models/comment");
    
var data            = [
        {
            name: "Cloud's Rest",
            image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
            description: "Blah Blah Blah"
        },
        {
            name: "Desert Mesa",
            image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
            description: "Blah Blah Blah"
        },
        {
            name: "Canyon Floor",
            image: "https://farm4.staticflickr.com/189/493046463_841a18169e.jpg",
            description: "Blah Blah Blah"
        },
        {
            name: "Deep forest at the night",
            image: "https://www.flickr.com/photos/39873796@N06/14841781105/",
            description: "Blah Blah Blah"
        }
    ];
    
    
function seedDB() {
    // Romove all Campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed Campgrounds!");
            // Add a few Campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, data){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added a Campground");
                        //create a comment
                        Comment.create({
                            text: "This place is great, but i wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                Campground.comments.push(comment);
                                Campground.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                });
            });
        }
    });
    
    
    // Add a few Comments
};

module.exports = seedDB;