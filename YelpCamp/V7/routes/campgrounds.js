var express     = require("express"),
	router      = express.Router(),
	Campground  = require("../models/campground");

//INDEX - Show All allCampgrounds
router.get("/",function(req,res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
	    else{
			res.render("campgrounds/index",{campgrounds: allCampgrounds});
		}
	});
});

//NEW - Show Form To Create New Campground
router.get("/new",isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

//CREATE - Add New Comment To DB
router.post("/",isLoggedIn,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author= {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name , image: image, description: desc, author:author}
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			console.log(newlyCreated);
			res.redirect("/campgrounds")
		}
	});
});

//SHOW - Show More Info About One Campground
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
			console.log(req.params.id)
			// res.redirect("/campgrounds");
		}else{
			console.log(foundCampground)
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

module.exports = router;