var express           = require("express"),
app                   = express(),
mongoose              = require("mongoose"),
bodyParser            = require("body-parser"),
passport              = require("passport"),
User                  = require("./models/user"),
LocalStrategy         = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/auth_demo_app",{useNewUrlParser:true , useUnifiedTopology:true, useFindAndModify:false});

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

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

//============================
//ROUTES
//==============================

app.get("/",function(req,res){
	res.render("home");
});

app.get("/secret",isLoggedIn, function(req,res){
	res.render("secret");
});

//Auth Routes

app.get("/register",function(req,res){
	res.render("register");
})

app.post("/register",function(req,res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}),req.body.password, function(err,user){
		if(err){
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/login");
		})
	})
});

//Login Routes

app.get("/login",function(req,res){
	res.render("login");
});

app.post("/login", passport.authenticate("local",{
	successRedirect: "/secret",
	failureRedirect: "/login"
}),function(req,res){
	
});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

app.listen(3000,function(){
	console.log("Server started");
});