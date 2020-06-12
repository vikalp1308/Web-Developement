// var request = require("request");
// request('https://jsonplaceholder.typicode.com/todos/1',function(error,response,body){
// 	eval(require("locus"))
// 		if(!error && response.statusCode == 200){
// 			var parsedData = JSON.parse(body);
// 			console.log(parsedData);
// 	}
// });


const request = require("request");
request('https://jsonplaceholder.typicode.com/users/1',function(error,response,body){
		if(!error && response.statusCode == 200){
			const parsedData = JSON.parse(body);
			console.log(parsedData.name + " lives in " + parsedData.address.city);
			console.log(parsedData["name"] + " lives in " + parsedData["address"]["city"]);
			console.log(`${parsedData.name} lives in  ${parsedData.address.city}`);
	}
});

// var request = require("request");
// pry = require('pryjs')
// request('https://jsonplaceholder.typicode.com/todos/1',function(error,response,body){
// 	eval(pry.it)
// 		if(!error && response.statusCode == 200){
// 			var parsedData = JSON.parse(body);
// 			console.log(parsedData);
// 	}
// });
