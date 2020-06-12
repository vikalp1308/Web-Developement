var express=require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

var friend = ["Nitish","Aman","Vivek","Kapil"];

app.get("/",function(req,res){
	res.render("home");
})

app.post("/addfriend",function(req,res){
	var newfriend = req.body.newfriend;
	friend.push(newfriend);
	res.redirect("/friend");						
});						

app.get("/friend",function(req,res){
	res.render("friend",{friend: friend});
})

app.listen(3000,function(){
	console.log("server started");
})