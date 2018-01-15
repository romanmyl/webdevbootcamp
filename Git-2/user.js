var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

///// LOGIN
<form action="/login" method="POST">
    <input type="text" name="username" placeholder="username">
    <input type="password" name="password" placeholder="password">
    <button>Submit</button>
</form>

<li><a href="/register">Sing Up!</a></li>
<li><a href="/login">Ligin</a></li>
<li><a href="/logout">Logout</a></li>