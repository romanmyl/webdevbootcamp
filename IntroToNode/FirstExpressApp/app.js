var express = require("express");
var app = express();

// "/" => "Hi There!";
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" => "Goodbye";
app.get("/bye", function(req, res){
    res.send("Goodbye!!!");
});

// "/dog" => "Meow";
app.get("/dog", function(req, res){
    console.log("SOMEONE MADE A REQUEST TO /DOG!!!");
    res.send("MEOW!!!");
});

app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName;
    
    res.send("YOU ARE IN " + subreddit.toUpperCase() + " PAGE NOW!!!");
});

app.get("/r/:subreddit/comments/:id/:title/", function(req, res){
    res.send("SOMETHING ELSE!!!");
});

// "/anything" => "YOU ARE A STAR!!!"
app.get("*", function(req, res){
    res.send("YOU ARE A STAR!!!");
});

// Tell Express to listen for request (start SERVER);
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER HAS STARTED!");
});