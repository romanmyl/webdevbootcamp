var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo");

// POST
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// USER
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


// var newUser = new User({
//     email: "harmione@hogwards.edu",
//     name: "Harmione Granger"
// });

// newUser.posts.push({
//     title: "How to bre polyjuice potion",
//     content: "Just kidding! Go to potions class to learn it!"
// });

// newUser.save(function(err, user){
//   if(err){
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });
// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Harmione Granger"}, function(err, user){
    if(err){
        // console.log(err);
    } else {
        user.posts.push({
            title: "Just 3 tings!",
            content: "Voldemort. Voldemort. Voldemort."
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});