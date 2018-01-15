var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
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
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more information about one campground
app.get("/campgrounds/:id", function(req, res){
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

// =========================================
//             COMMENTS ROUTES
// =========================================

app.get("/campgrounds/:id/comments/new", function(req, res){
    //FIND CAMPGROUND BY ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server has Started ..."); 
});



// RESTFULL ROUTES

// name        url         verb            description
// =====================================================================
// INDEX       /dogs       GET             Display a list of all dogs
// NEW         /dogs/new   GET             Displays form to make a new dog
// CREATE      /dogs       POST            Add new dog to DB
// SHOW        /dogs/:id   GET             Shows info about one dog


// RESTFULL ROUTES

// name        url         verb            description
// =====================================================================
// INDEX       /campgrounds       GET             Display a list of all camps
// NEW         /campgrounds/new   GET             Displays form to make a new camp
// CREATE      /campgrounds       POST            Add new camp to DB
// SHOW        /campgrounds/:id   GET             Shows info about one camp

// COMMENTS:
// NEW         /campgrounds/:id/comments/new      GET
// CREATE      /campgrounds/:id/comments          POST

