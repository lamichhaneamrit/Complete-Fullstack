var async = require('async')
var cat = require('../models/cat-model')
var Products = require('../models/product-model')
var mkdirp = require('mkdirp')
var fs = require('fs-extra')
var resizeImg = require('resize-img')
var User = require('../models/User')
const { ensureAuthenticated } = require('../config/checkAuth')

var Brand = require('../models/brand-model')
var Type = require('../models/type-model')



module.exports = (app) => {
    app.get('/', (req, res) => {

        Products.find({}, (err, prod) => {
            console.log("g", prod)
            res.render('index', {
                title: 'fd',
                prod: prod,
                user: req.user
            })

        })
    })





    app.get('/products', (req, res) => {
        var log = (req.isAuthenticated()) ? true : false
        async.parallel([
            function(callback) {
                cat.find({}, (err, cat) => {
                    callback(err, cat)


                })
            },
            function(callback) {
                Products.find({}, (err, p) => {
                    callback(err, p)
                })
            },
            function(callback) {
                Type.find({}, (err, type) => {
                    callback(err, type)
                })
            },
            function(callback) {
                Brand.find({}, (err, brand) => {
                    callback(err, brand)
                })
            }

        ], (err, r) => {
            const c1 = r[0];
            const p1 = r[1]
            const t1 = r[2]
            const b1 = r[3]


            res.render('product2', {
                c1: c1,
                p1: p1,
                t1: t1,
                b1: b1,
                title: 'products',
                log: log
            })
        })
    })

    app.get('/products/sale', (req, res) => {
        var s = req.params.b

        var log = (req.isAuthenticated()) ? true : false
        async.parallel([
            function(callback) {
                cat.find({}, (err, cat) => {
                    callback(err, cat)


                })
            },
            function(callback) {
                Products.find({
                    'type': "Sale"
                }, (err, p) => {
                    callback(err, p)
                })
            },

            function(callback) {
                Type.find({}, (err, type) => {
                    callback(err, type)
                })
            },
            function(callback) {
                Brand.find({}, (err, brand) => {
                    callback(err, brand)
                })
            }

        ], (err, r) => {
            const r1 = r[0];
            const p1 = r[1]
            const t1 = r[2]
            const b1 = r[3]


            res.render('prod_type', {
                r1: r1,
                p1: p1,
                t1: t1,
                b1: b1,


                title: 'products',
                log: log
            })
        })
    })
    app.get('/products/cat/:c/:b', (req, res) => {
        var b = req.params.b
        var c = req.params.c
        var log = (req.isAuthenticated()) ? true : false
        async.parallel([
            function(callback) {
                cat.find({}, (err, cat) => {
                    callback(err, cat)


                })
            },
            function(callback) {
                Products.find({
                    'category': req.params.c
                }, (err, p) => {
                    callback(err, p)
                })
            },

            function(callback) {
                Type.find({}, (err, type) => {
                    callback(err, type)
                })
            },
            function(callback) {
                Brand.find({}, (err, brand) => {
                    callback(err, brand)
                })
            }

        ], (err, r) => {
            const r1 = r[0];
            const p1 = r[1]
            const t1 = r[2]
            const b1 = r[3]


            res.render('cat_brand', {
                r1: r1,
                p1: p1,
                t1: t1,
                b1: b1,
                b: b,
                c: c,
                title: 'products',
                log: log
            })
        })
    })

    app.get('/products/cats/:c/:t', (req, res) => {
        var t = req.params.t
        var c = req.params.c
        var log = (req.isAuthenticated()) ? true : false
        async.parallel([
            function(callback) {
                cat.find({}, (err, cat) => {
                    callback(err, cat)


                })
            },
            function(callback) {
                Products.find({
                    'category': req.params.c
                }, (err, p) => {
                    callback(err, p)
                })
            },

            function(callback) {
                Type.find({}, (err, type) => {
                    callback(err, type)
                })
            },
            function(callback) {
                Brand.find({}, (err, brand) => {
                    callback(err, brand)
                })
            }

        ], (err, r) => {
            const r1 = r[0];
            const p1 = r[1]
            const t1 = r[2]
            const b1 = r[3]


            res.render('cat_type', {
                r1: r1,
                p1: p1,
                t1: t1,
                b1: b1,
                t: t,
                c: c,
                title: 'products',
                log: log
            })
        })
    })











    app.get('/products/cat/:c', (req, res) => {
        var c = req.params.c
        var log = (req.isAuthenticated()) ? true : false
        async.parallel([
            function(callback) {
                cat.find({}, (err, cat) => {
                    callback(err, cat)


                })
            },
            function(callback) {
                Products.find({
                    'category': req.params.c
                }, (err, p) => {
                    callback(err, p)
                })
            },

            function(callback) {
                Type.find({}, (err, type) => {
                    callback(err, type)
                })
            },
            function(callback) {
                Brand.find({}, (err, brand) => {
                    callback(err, brand)
                })
            }

        ], (err, r) => {
            const r1 = r[0];
            const p1 = r[1]
            const t1 = r[2]
            const b1 = r[3]


            res.render('cat_product', {
                r1: r1,
                p1: p1,
                t1: t1,
                b1: b1,
                c: c,
                title: 'products',
                log: log
            })
        })
    })
    app.get('/products/brand/:b', (req, res) => {
        var b = req.params.b
        var log = (req.isAuthenticated()) ? true : false
        async.parallel([
            function(callback) {
                cat.find({}, (err, cat) => {
                    callback(err, cat)


                })
            },
            function(callback) {
                Products.find({
                    'brand': req.params.b
                }, (err, p) => {
                    console.log(p)
                    callback(err, p)
                })
            },

            function(callback) {
                Type.find({}, (err, type) => {
                    callback(err, type)
                })
            },
            function(callback) {
                Brand.find({}, (err, brand) => {
                    callback(err, brand)
                })
            }

        ], (err, r) => {
            const r1 = r[0];
            const p1 = r[1]
            const t1 = r[2]
            const b1 = r[3]


            res.render('brand_product', {
                r1: r1,
                p1: p1,
                t1: t1,
                b1: b1,
                b: b,
                title: 'products',
                log: log
            })
        })
    })
    app.get('/products/type/:t', (req, res) => {
        var t = req.params.t
        var log = (req.isAuthenticated()) ? true : false
        async.parallel([
            function(callback) {
                cat.find({}, (err, cat) => {
                    callback(err, cat)


                })
            },
            function(callback) {
                Products.find({
                    'type2': req.params.t
                }, (err, p) => {
                    console.log(p)
                    callback(err, p)
                })
            },

            function(callback) {
                Type.find({}, (err, type) => {
                    callback(err, type)
                })
            },
            function(callback) {
                Brand.find({}, (err, brand) => {
                    callback(err, brand)
                })
            }

        ], (err, r) => {
            const r1 = r[0];
            const p1 = r[1]
            const t1 = r[2]
            const b1 = r[3]


            res.render('type_product', {
                r1: r1,
                p1: p1,
                t1: t1,
                b1: b1,
                t: t,
                title: 'products',
                log: log
            })
        })
    })

    app.get('/products/:c/:id', (req, res) => {
        var log = (req.isAuthenticated()) ? true : false
        var g = null
        var c = req.params.c
        Products.find({}, (err, p2) => {

            cat.find({}, (err, r1) => {

                Products.findOne({
                    'title': req.params.id
                }, (err, p) => {


                    var galleryDir = 'public/product_images/' + p._id + '/gallery'
                    fs.readdir(galleryDir, function(err, files) {
                        g = files

                        res.render('layout/product', {
                            g: g,
                            r1: r1,
                            p: p,
                            c: c,
                            p2: p2,
                            title: 'products',
                            log: log
                        })

                    })

                })
            })
        })
    })







    app.get('/product/:id', ensureAuthenticated, (req, res) => {
        Products.findOne({ '_id': req.params.id }, (err, p) => {


            res.render('review', {
                title: 'ti',
                id: req.params.id,
                p: p,
                user: req.user
            })
        })
    })
    app.post('/product/:id', ensureAuthenticated, (req, res) => {



        async.parallel([
            function(callback) {
                Products.update({

                    '_id': req.params.id,

                }, {
                    $push: {
                        ProductRating: {
                            userId: req.user._id,
                            username: req.user.username,


                            userReview: req.body.desc,
                            userRating: req.body.count

                        },


                        ratingNumber: req.body.count

                    },
                    $inc: { ratingSum: req.body.count },


                }, (err, count) => {
                    req.flash('success', 'YOUR REVIEW HAS BEEN ADDED')
                    res.redirect('/product/' + req.params.id)
                })


            }

        ])
    })

}