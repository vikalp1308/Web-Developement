var express    =  require("express"),
    app        =  express(),
    bodyParser =  require("body-parser"),
    mongoose   =  require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelp_camp_v2', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Vikalp", 
// 		image:"https://images.unsplash.com/photo-1558980664-1db506751c6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 		description: "Hi My name is Vikalp and This Photo is clicked 5 years ago"
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 	}   else{
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 	}
// });		
		
app.get("/",function(req,res){
	res.render("landing");
})

app.get("/campgrounds",function(req,res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
	    else{
			res.render("index",{campgrounds: allCampgrounds});
		}
	});
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name , image: image, description: desc}
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds")
		}
	});
});


app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
			console.log(req.params.id)
			// res.redirect("/campgrounds");
		}else{
			res.render("show",{campground: foundCampground});
		}
	});
});



app.listen(3000,function(){
	console.log("Yelp camp server Has started");
});