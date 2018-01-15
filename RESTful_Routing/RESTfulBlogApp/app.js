var bodyParser          = require("body-parser"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    mongoose            = require("mongoose"),
    express             = require("express"),
    app                 = express();

// APP CONFIG    
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "test Blog",
//     image: "data:image/jpeg;base64,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",
//     body: "HELLO! This is a blogpost!"
// });

// RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    // create blog
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log("=============================");
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render("new");
       } else {
           // Then, redirect to the INDEX
           res.redirect("/blogs");
       }
   }); 
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          res.redirect("/blogs");
      } else {
          res.render("show", {showBlog: foundBlog});
      }
    });
});

// Edit ROUTE
app.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, findBlog){
      if(err){
          res.redirect("/blogs");
      } else {
          res.render("edit", {blog: findBlog});
      }
  });    
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log("==========");
    console.log(req.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, UpdateBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs/" + req.params.id);
       }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
   Blog.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs");
      }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("MY Server IS RUNING!");
});