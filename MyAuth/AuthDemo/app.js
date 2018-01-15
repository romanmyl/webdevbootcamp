var express         = require("express");
var mongoose        = require("mongoose");
mongoose.connect("mongodb://localhost/app_demo_auth");

var app             = express();
app.set("view engine", "ejs");

//
app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("my server has started ......");
});