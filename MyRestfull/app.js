var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();
    
mongoose.connect("mongodb://localhost/my-restful");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
   title: String, 
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

var Blabla = mongoose.model("Blabla", blogSchema);



app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blabla.find({}, function(err, elements){
        if(err){
            console.log(err);
        } else {
            res.render("index", {b: elements});
        }
    });
});
app.get("/blogs/new", function(req, res){
   res.render("new"); 
});

// CREATE POST
app.post("/blogs", function(req, res){
   Blabla.create(req.body.bl, function(err, newBlooog){
       if(err){
           res.render("new");
       } else {
           res.redirect("/blogs");
       }
  });
});

// EDIT ROUTE
app.put("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, findBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("edit", {blog: findBlog});
       }
    });  
)};

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, findBlog){
       if(err){
           redirect("/blogs");
       } else {
           redirect("/blogs" + blog.body.blog);
       }
   });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
// DESTROY blog 
    Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
    });
// REDIRECT somewhere
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("MY BLOG SERVER IS RUNING!"); 
});