var mongoose            = require("mongoose"),
    bodyParser          = require("body-parser"),
    express             = require("express"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user"),
    app                     = express();
    
mongoose.connect("mongodb://localhost/app_demo_auth");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "My secret",
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserealizeUser());



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server running ......");
});



/////

var express                 = require("express"),
    mogoose                 = require("mongoose"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user"),
    app                     = express();
    
mongoose.connect("mongodb://localhost/app_demo_auth");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "I love Sofi",
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started .......");
});


///////////////////////////////////////////////

var express                 = require("express"),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express(),
    User                    = require("./models/user");
    
mongoose.connect("mongodb://localhost/app_demo_auth");
app.set("view engint", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "I love my Sofi",
    resave: false,
    saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserealizeUser());



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("my server is running ........"); 
});


/////////////////////////////////////////



var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express();
    
mongoose.connect("mongodb://localhost/app_demo_auth");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "I love my Sofi",
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running .....");
});

//////////////////////////////////

var express                 = require("express"),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express();
    
    
mongoose.connect("mongodb://localhost/app_demo_auth");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
   secret: "My Sofi the BEST in the World",
   resave: false,
   saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serislizeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server started ...."); 
});

////////////////////////////////////

var express                 = require("express"),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express();
    
mongoose.connect("mongodb://localhost/app_demo_auth");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "my Sofi - The BEST in the world",
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("my server has started ..."); 
});

/////////////

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

app.get("/register", function(req, res){
   res.render("register"); 
});

app.post("/register", function(req, res){
   User.register(new User({username: req.body.username}), req.body.password, function(err, user){
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

app.get("/login", function(req, res){
    res.render("login");
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});

app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started .....");
});