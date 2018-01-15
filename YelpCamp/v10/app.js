var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

// Requring routes    
var campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    indexRoutes         = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v10");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB(); // seed the database

//=====  PASSPORT CONFIGURATION  =====
app.use(require("express-session")({
    secret: "Sofi is the BEST girl in the world!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//======= passing currentUser to every route =====
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server has Started ..."); 
});


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