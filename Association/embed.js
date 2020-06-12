var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo",{useNewUrlParser: true, useUnifiedTopology: true});

var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post",postSchema);

var userSchema = new mongoose.Schema({
	email: String,
	name:  String,
	posts: [postSchema]
});

var User = mongoose.model("User",userSchema);

// var newUser = new User({
// 	email: "Vikalp13082001@gmail.com",
// 	name: "Vikalp Khandelwal"
// });

// newUser.posts.push({
// 	title: "second post",
// 	content: "hey!! HIHIHIHI"
// });

// newUser.save(function(err,user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "first Post",
// 	content:"This Is my first post"
// });

// newPost.save(function(err,post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// });

User.findOne({name:"Vikalp Khandelwal"},function(err,user){
	if(err){
		console.log(err);
	}else{
		user.posts.push({
			title: "3 thing I really hate",
			content: "Hi Hey Hello"
        });

		user.save(function(err,user){
			if(err){
				console.log(err);
			}else{
				console.log(user);
	        }
          });
	    }
    });



