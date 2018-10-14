var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
	name: "Cloud's Rest",
	img: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	description: "Etiam semper metus id venenatis pretium. Maecenas commodo dolor vitae semper convallis. Quisque tristique vulputate erat, et gravida neque scelerisque non. Donec vitae diam lectus"
	},{
		name: "night fall",
		img: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		description: " Phasellus id dictum nibh, ac hendrerit massa. Vivamus nulla justo, rutrum at neque at, consequat faucibus est. Integer lacinia eu ex et scelerisque."
		
	},
	{
		name: "Sky Rock",
		img: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		description: " Phasellus id dictum nibh, ac hendrerit massa. Vivamus nulla justo, rutrum at neque at, consequat faucibus est. Integer lacinia eu ex et scelerisque."
		
	},
	,
	{
		name: "May weather",
		img: "https://images.pexels.com/photos/6714/light-forest-trees-morning.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		description: " Phasellus id dictum nibh, ac hendrerit massa. Vivamus nulla justo, rutrum at neque at, consequat faucibus est. Integer lacinia eu ex et scelerisque."
		
	},
	];


function seedDB(){
	Campground.deleteMany({}, function(err){

});

}



module.exports = seedDB;