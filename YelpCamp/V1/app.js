var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds =[
		{name: "vikalp", image: "https://images.unsplash.com/photo-1518775006023-10bdc4ada7c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
		{name: "Nitish", image: "https://images.unsplash.com/photo-1558980664-1db506751c6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
		{name: "Aman",   image: "https://images.unsplash.com/photo-1586769203201-3f12adc567a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=845&q=80" },
	    {name: "kannu", image: "https://images.unsplash.com/photo-1586785442401-fd910a25d622?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
		{name: "Ajay", image: "https://images.unsplash.com/photo-1586677396145-63e046cf3a26?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
		{name: "saurav",   image: "https://images.unsplash.com/photo-1586398761133-3eabe7298f0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
        {name: "Kapil", image: "https://images.unsplash.com/photo-1518259102261-b40117eabbc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
		{name: "Vivek", image: "https://images.unsplash.com/photo-1586290447123-12a8596dcaef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
		{name: "Chirag",   image: "https://images.unsplash.com/photo-1586763209566-2ae6aa8054f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1025&q=80" }
];

app.get("/",function(req,res){
	res.render("landing");
})

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name , image: image}
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
})

app.listen(3000,function(){
	console.log("Yelp camp server Has started");
})