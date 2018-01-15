var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//       name: "Granite Hill", 
//       image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//       description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND:");
//             console.log(campground);
//         }
//     }
// );

    // var campgrounds = [
    //     {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"}, 
    //     {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},    
    //     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
    //     {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"}, 
    //     {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},    
    //     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
    //     {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"}, 
    //     {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},    
    //     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}    
    // ]
    
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
            res.render("index", {campgrounds:allCampgrounds});
        }
    })
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
    res.render("new");
});

// SHOW - shows more information about one campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        } else {
            // Render show template with that campground
            res.render("show", {campground: foundCamp});
        }
    })
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