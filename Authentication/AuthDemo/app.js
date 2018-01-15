var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");
    
    
mongoose.connect("mongodb://localhost/auth_demo_app");


var app         = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "my Sofi is the best in the World",
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//===================
// RESTFUL ROUTES
//===================

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");    
});

// Auth routes

//Show sign up form
app.get("/register", function(req, res){
    res.render("register"); 
});
//Hamdling user sign up form
app.post("/register", function(req, res){
   User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
       if(err){
           console.log(err);
           return res.render("register");
       } else {
           passport.authenticate("local")(req, res, function(){
               res.redirect("/secret");
           });
       }
   });
});

// LOGIN ROUTES
// render login form
app.get("/login", function(req, res){
   res.render("login"); 
});
//midleware (login logic)
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});

//logout
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("my server started ..........");
});