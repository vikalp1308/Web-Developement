var express           =  require("express"),
app                   =  express(),
bodyParser            =  require("body-parser"),
mongoose              =  require("mongoose"),
Campground            =  require("./models/campground"),
Comment               =  require("./models/comment"),
User                  = require("./models/user"),
seedDB                =  require("./seeds"),
passport              = require("passport"),
LocalStrategy         = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose");

// seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp_v5', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

//Passport Configuration

app.use(require("express-session")({
	secret: "I'm the best man in the world",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});
		
app.get("/",function(req,res){
	res.render("landing");
})

//INDEX - Show All allCampgrounds
app.get("/campgrounds",function(req,res){
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
app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new");
});

//CREATE - Add New Comment To DB
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

//SHOW - Show More Info About One Campground
app.get("/campgrounds/:id",function(req,res){
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

//====================
//COMMENTs ROUTEs
//=====================

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		}
	})
});

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err)
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
			console.log(req.body.comment);
		}
	})
});

//================
//Auth Routes
//================

//Show Register Form
app.get("/register",function(req,res){
	res.render("register");
});

//Handle Sign Up Logic
app.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err,user){
		if(err){
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		})
	})
});

//Show Login Form
app.get("/login",function(req,res){
	res.render("login");
});

//Handle Login Logic
app.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}),function(req,res){
	
});

//LogOut Route
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


app.listen(3000,function(){
	console.log("Yelp camp server Has started");
});