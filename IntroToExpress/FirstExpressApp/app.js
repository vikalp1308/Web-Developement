var express = require("express");
var app = express();

app.get("/",function(req,res){
	res.send("Hi there ");
});

app.get("/bye",function(req,res){
	console.log("someone made a request /bye");
	res.send("goddbye kannu");
});

app.get("/dog",function(req,res){
	console.log("someone made a request /dog");
	res.send("Welcome puppy");
});

app.get("*",function(req,res){
	res.send("Sorry, page not found... What are you doing with your life ?");
});


app.listen(3000,function(){
	console.log("server listenning on port 3000");
})

