var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("home");
});

app.get("/fellinlovewith/:some", function(req, res){
    var some = req.params.some;
    res.render("love", {thingVar: some});
});

app.get("/posts", function(req, res){
   var posts = [
       {title: "Post 1", author: "Susy"},
       {title: "My adorable pet bunny", author: "Charlie"},
       {title: "Can you believe this Bruce Lee?", author: "Roman Mylenkyy"}
       ]; 
       
       res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The SERVER has STARTED!!!"); 
});