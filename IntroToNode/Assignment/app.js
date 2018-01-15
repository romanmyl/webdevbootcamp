var express = require("express");
var app = express();

// "/" => "Hi there, wellcome to my assignment!"
app.get("/", function(req, res){
    res.send("Hi there, wellcome to my assignment!");
});

// "/speak/pig"
app.get("/speak/:animal", function(req, res){
    var sound = {
        pig: "Oink",
        dog: "Woof Woof!",
        cow: "Moo",
        cat: "I hate you humans!",
        goldfish: "..."
    };
    var animal = req.params.animal.toLowerCase();
    var sound = sound[animal];
    var anml = animal.toUpperCase();
    res.send("The " + anml + " says '" + sound +"'");
});

// // "/speak/cow"
// app.get("/speak/cow", function(req, res){
//     res.send("The cow says 'Moo'");
// });

// // "/speak/dog", function(req, res){
// app.get("/speak/dog", function(req, res){
//     res.send("The dog says 'Woof Woof!'");
// });

// "/repeat/:word/:times"
app.get("/repeat/:word/:times", function(req, res){
    var number = Number(req.params.times);
    var word = req.params.word;
//    var arr = [];
    var repeat = "";
    for(var i = 0; i < number; i++){
//        arr.push(word);
    repeat += word + " ";
    };
//    var repeat = arr.join(" ");
    res.send(repeat);
});

// "*" => "Sorry..."
app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life!");
});

// Adding listening for the request
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has STARTED!!!");
});