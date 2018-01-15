var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var friends = ["Sofijka - the BEST DOUGHTER IN THE WHOLE WORLD!!!", "Tatoo", "Andrik", "Alinka", "Pernatyy", "Sergii"];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res){
   res.render("friends", {friends: friends}); 
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has STARTED!!!");
})