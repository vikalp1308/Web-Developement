const rp = require("request-promise");
rp('https://jsonplaceholder.typicode.com/users/1')
	.then(function(body) {
		const parsedData = JSON.parse(body);
		console.log(parsedData.name + " lives in " + parsedData.address.city);
})
	.catch(function(err) {
		console.log('Error!',err);
});

// const rp = require("request-promise");
// rp('https://jsonplaceholder.typicode.com/todos/1')
// 	.then((body) => {
// 		const parsedData = JSON.parse(body);
// 		console.log(parsedData.name + " lives in " + parsedData.address.city);
// })
// 	.catch((err) => {
// 		console.log('Error!',err);
// });