var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app",{useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});
var Cat = mongoose.model("Cat", catSchema); 

var george = new Cat({
	name: "tiger",
	age: 11,
	temperament: "Grouchy"
});

// george.save(function(err, cat){
// 	if(err){
// 		console.log("SOMETHING WENT WRONG");
// 	}else{
// 		console.log("WE JUST SAVED A CAT");
// 		console.log(cat);
// 	}
// })

Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"
}, function(err, cat){
	if(err){
	   console.log(err);
	   }else{
		   console.log(cat);
	   }
});

Cat.find({}, function(err, cats){
	if(err){
		console.log("OH NO, ERROR!");
		console.log(err);
	}else{
		console.log("ALL THE CATS......");
		console.log(cats);
	}
});