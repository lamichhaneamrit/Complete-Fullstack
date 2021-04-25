var async = require('async');
var cat = require('../models/cat-model')
var Products = require('../models/product-model')
var mkdirp = require('mkdirp')
var fs = require('fs-extra')
var resizeImg = require('resize-img')
const { ensureAuthenticated } = require('../config/checkAuth')




module.exports = (app) => {

    app.get('/cart/add/:product', ensureAuthenticated, function(req, res) {

        var slug = req.params.product;

        Products.findOne({ 'title': slug }, function(err, p) {
            if (err)
                console.log(err);

            if (typeof req.session.cart == "undefined") {
                req.session.cart = [];
                req.session.cart.push({
                    title: slug,
                    qty: 1,
                    price: parseFloat(p.price).toFixed(2),
                    image: '/product_images/' + p._id + '/' + p.image
                });
            } else {
                var cart = req.session.cart;
                console.log('l', req.session.cart)
                var newItem = true;

                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].title == slug) {

                        if (cart[i].qty < p.quantity) {
                            cart[i].qty++;

                        }

                        newItem = false;
                        break;





                    }
                }
            }
            if (newItem) {
                cart.push({
                    title: slug,
                    qty: 1,
                    price: parseFloat(p.price).toFixed(2),
                    image: '/product_images/' + p._id + '/' + p.image
                });
            }


            //        console.log(req.session.cart);
            req.flash('success', 'Product added!');
            console.log(req.session.cart)
            res.redirect('back');
        });

    });
    app.get('/cart/checkout', ensureAuthenticated, (req, res) => {
        if (req.session.cart && req.session.cart.length == 0) {
            delete req.session.cart
            res.redirect('/cart/checkout')
        } else {
            cat.find({}, (err, r1) => {
                res.render('checkout', { title: 'd', r1: r1, cart: req.session.cart })
            })
        }
    })

    app.get('/cart/update/:product', ensureAuthenticated, (req, res) => {
        var title = req.params.product
        var cart = req.session.cart
        var action = req.query.action
        Products.findOne({ 'title': title }, function(err, p) {
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].title == title) {
                    if (action == "add") {
                        if (cart[i].qty < p.quantity) {
                            cart[i].qty++
                        }

                    } else if (action == "remove") {
                        if (cart[i].qty > 0) {
                            cart[i].qty--
                        }

                    } else if (action == "clear") {
                        cart.splice(i, 1)
                        if (cart.length == 0) {
                            delete req.session.cart

                        }

                    }
                    break;
                }

            }
            res.redirect('/cart/checkout')
        })
    })
    app.get('/cart/clear', ensureAuthenticated, (req, res) => {

        delete req.session.cart
        res.redirect('/cart/checkout')
    })
}