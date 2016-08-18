'use strict';
var Product = require('../models/productModel');
var Category = require('../models/categoryModel');

module.exports = function(router){
	router.get('/', function(req, res){
		// Get cart from session
		var cart = req.session.cart;
		var displayCart = {items: [], total:0};
		var total = 0;

		// Get Total
		for(var item in cart){
			displayCart.items.push(cart[item]);
			total += (cart[item].qty * cart[item].price);
		}
		displayCart.total = total.toFixed(2);

		// Render Cart
		res.render('cart/index', {
			cart: displayCart
		});
	});

	router.post('/:id', function(req, res){
		req.session.cart = req.session.cart || {};
		var cart = req.session.cart;

		Product.findOne({_id:req.params.id}, function(err, product){
			if(err){
				console.log(err);
			}

			if(cart[req.params.id]){
				cart[req.params.id].qty++
			} else {
				cart[req.params.id] = {
					item: product._id,
					title: product.title,
					price: product.price,
					qty: 1
				}
			}

			res.redirect('/cart');
		});
	});
}