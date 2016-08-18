'use strict';

var Product = require('../models/productModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/', function (req, res) {   
        res.render('manage/index');             
    });

    // get Products
    router.get('/products', function (req, res) {   
        Product.find({}, function(err, products){
         	if(err){
         		console.log(err);
         	}

         	var model = {
         		products: products
         	}

         	res.render('manage/products/index', model);
         });             
    });

    //Add Product Form
    router.get('/products/add', function(req, res){
    	Category.find({}, function(err, categories){
    		if(err){
         		console.log(err);
         	}

         	var model = {
         		categories: categories
         	}

         	res.render('manage/products/add', model);
    	});
    });

    // Add Product
    router.post('/products', function(req, res){
    	var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var country = req.body.country && req.body.country.trim();
        var collect = req.body.collect && req.body.collect.trim();
        var price = req.body.price && req.body.price.trim();
        var description= req.body.description && req.body.description.trim();
        var title = req.body.title && req.body.title.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if (title == '' || price == '') {
            req.flash('error', "Please fill out required fields");
            res.location('/manage/products/add');
            res.redirect('/manage/products/add');
        }

        if(isNaN(price)){
            req.flash('error', "Price must be a number");
            res.location('/manage/products/add');
            res.redirect('/manage/products/add');
        }

        var newProduct = new Product({
            title: title,
            category: category,
            description: description,
            country: country,
            collect: collect,
            cover: cover,
            price: price
        });

        newProduct.save(function(err){
            if(err) {
                console.log('save error', err);
            }

            req.flash('success', "Product Added");
            res.location('/manage/products');
            res.redirect('/manage/products');
        });
    });

    // Edit Product
    router.get('/products/edit/:id', function (req, res) {
         Category.find({},function (err, categories) {
             Product.findOne({_id:req.params.id},function (err, product) {
                if (err) {
                    console.log(err);
                }
                var model ={
                    product: product,
                    categories: categories
                };
                res.render('manage/products/edit', model);
            });
        });
    });

    // Update Product
    router.post('/products/edit/:id', function(req, res){
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var country = req.body.country && req.body.country.trim();
        var collect = req.body.collect && req.body.collect.trim();
        var price = req.body.price && req.body.price.trim();
        var description= req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim();


        Product.update({_id: req.params.id}, {
            title:title,
            category: category,
            country: country,
            collect: collect,
            price: price,
            description: description,
            cover: cover

        }, function(err) {
            if(err) {
                console.log('update error', err);
            }

            req.flash('success', "Product Updated");
            res.location('/manage/products');
            res.redirect('/manage/products');
        });

    });

    // Delete product
    router.post('/products/delete/:id', function (req, res) {
        Product.remove({_id: req.params.id}, function (err) {
            if (err) {
                console.log(err);
            }
            req.flash('success', "Product Deleted");
            res.location('/manage/products');
            res.redirect('/manage/products');
        });
    });


    // Get Categories
    router.get('/categories', function (req, res) {   
        Category.find({}, function(err, categories){
            if(err){
                console.log(err);
            }

            var model = {
                categories: categories
            };

            res.render('manage/categories/index', model); 
        })              
    });

    // Display category add form
    router.get('/categories/add', function (req, res) {
        res.render('manage/categories/add');
    });


    // Add a new category
    router.post('/categories', function(req, res){
        var name= req.body.name && req.body.name.trim();

        if (name == '') {
            req.flash('error', "Please fill out required fields");
            res.location('/manage/categories/add');
            res.redirect('/manage/categories/add');
        }

        var newCategory = new Category({
            name:name
        });

        newCategory.save(function(err) {
            if(err) {
                console.log('save error', err);
            }

            req.flash('success', "Category Added");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });

    });


     // Display category edit form
    router.get('/categories/edit/:id', function (req, res) {
         Category.findOne({_id:req.params.id},function (err, category) {
            if (err) {
                console.log(err);
            }
            var model ={
                category: category
            };
            res.render('manage/categories/edit', model);
        });
    });

    // Edit category
    router.post('/categories/edit/:id', function(req, res){
        var name= req.body.name && req.body.name.trim();

        Category.update({_id: req.params.id}, {
            name:name
        }, function(err) {
            if(err) {
                console.log('update error', err);
            }

            req.flash('success', "Category Updated");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });

    });

    // Delete category
    router.post('/categories/delete/:id', function (req, res) {
        Category.remove({_id: req.params.id}, function (err) {
            if (err) {
                console.log(err);
            }
            req.flash('success', "Category Deleted");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });

};
