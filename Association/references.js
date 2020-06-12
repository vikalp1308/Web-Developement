var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2",{useNewUrlParser: true, useUnifiedTopology: true});

var Post = require("./models/post");
var User = require("./models/user");

// Post.create({
// 	title: "Sunrise Post_3",
// 	content: "In The morning time sunrise seen is Fabulous"
// },function(err,post){
// 	User.findOne({name:"Birla"},function(err,foundUser){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			foundUser.posts.push(post);
// 			foundUser.save(function(err,data){
// 				if(err){
// 					console.log(err);
// 				}else{
// 				console.log(data)
// 				}
// 			})
// 		}
// 	})
// })

// User.create({
// 	email: "Bitjaipur50@gmail.com",
// 	name:   "Birla"
// });

User.findOne({name:"Birla"}).populate("posts").exec(function(err,user){
	if(err){
		console.log(err);
	}else{
		console.log(user);
	}
});