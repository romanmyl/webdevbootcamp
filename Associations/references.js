var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post"),
    User = require("./models/user");


Post.create({
    title: "How to create the best burger part-4",
    content: "I don't now how because i more like to eat PLOV!"
}, function(err, post){
    User.findOne({email: "nazar@galyk.ua"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

// User.create({
//   email: "nazar@galyk.ua",
//   name: "Nazar Galyk"
// });


// User.save(function(err, user){
//   if(err){
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });



//FIND USER
//FIND POSTS FOR THAT USER

// User.findOne({email: "nazar@galyk.ua"}).populate("posts").exec(function(err, user){
//   if(err){
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });