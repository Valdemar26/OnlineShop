'use strict';

var mongoose = require('mongoose');

var productModel = function(){
	var productSchema = mongoose.Schema({
		title: String,
		category: String,
		description: String,
		country: String,
		collect: String,
		price: Number,
		cover: String
	});

	// Shorten Text
	productSchema.methods.truncText = function(length){
		return this.description.substring(0, length);
	}

	return mongoose.model('Product', productSchema);
};

module.exports = new productModel();