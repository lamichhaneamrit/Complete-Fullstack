var mkdirp = require('mkdirp')
var async = require('async')
var fs = require('fs-extra')
var resizeImg = require('resize-img')
var Products = require('../models/product-model')
var Cat = require('../models/cat-model')
var Brand = require('../models/brand-model')
var Type = require('../models/type-model')
const { ensureAuthenticated } = require('../config/checkAuth')



module.exports = (app) => {
    app.get('/admin/products', ensureAuthenticated, (req, res) => {
        var count;

        Products.count(function(err, c) {
            count = c;
            console.log(count)

        })
        Products.find({}, (err, p) => {
            res.render('admin/products', {
                p: p,
                count: count
            })
        })
    })








    app.get('/admin/products/add-product', ensureAuthenticated, (req, res) => {
        var log = (req.isAuthenticated()) ? true : false
        async.parallel([
            function(callback) {
                Cat.find({}, (err, cat) => {
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


            res.render('admin/add_product', {
                c1: c1,
                p1: p1,
                t1: t1,
                b1: b1,
                title: 'products',
                log: log
            })
        })



    })

    app.post('/admin/products/add-product', ensureAuthenticated, (req, res) => {
        var imagef = typeof req.file !== "undefined" ? req.files.name : ""
        Products.findOne({ 'title': req.body.title }, (err, data) => {
            if (data) {
                req.flash('error', 'page slug exists')
                res.redirect('/admin/products/add-product')
            } else {
                var p = new Products()
                p.title = req.body.title,
                    p.desc = req.body.desc,
                    p.price = req.body.price,
                    p.discount = req.body.discount,
                    p.color = req.body.color,
                    p.size = req.body.size,
                    p.quantity = req.body.quantity,
                    p.category = req.body.category,
                    p.type = req.body.type,
                    p.image = imagef,
                    p.type2 = req.body.type2,
                    p.brand = req.body.brand,
                    p.overview = req.body.overview


                p.save((err) => {

                    mkdirp('public/product_images/' + p._id, function(err) {
                        return console.log(err)
                    })
                    mkdirp('public/product_images/' + p._id + '/gallery', function(err) {
                        return console.log(err)
                    })

                    mkdirp('public/product_images/' + p._id + '/gallery/thumbs', function(err) {
                        return console.log(err)
                    })

                    if (imagef != "") {
                        var ProductImage = req.files.image;
                        var path = 'public/product_images/' + p._id + '/' + imagef

                        ProductImage.mv(path, function(err) {
                            return console.log(err)
                        })
                    }

                    req.flash('success', 'added')

                    res.redirect('/admin/products/add-product')
                })


            }

        })



    })
    app.get('/admin/products/edit-product/:id', ensureAuthenticated, (req, res) => {
        var errors;
        if (req.session.errors) {
            errors = req.session.errors;
        }
        req.session.errors = null
        Type.find({}, (err, type) => {
            Brand.find({}, (err, brand) => {
                Cat.find({}, (err, cat) => {
                    Products.findById(req.params.id, (err, p) => {


                        var galleryDir = 'public/product_images/' + p._id + '/gallery'
                        var galleryImages = null;

                        fs.readdir(galleryDir, function(err, files) {


                            galleryImages = files

                            res.render('admin/edit_product', {
                                errors: errors,
                                cat: cat,
                                galleryImages: galleryImages,
                                p: p,
                                brand: brand,
                                type: type
                            })

                        })

                    })

                })
            })
        })
    })
    app.post('/admin/products/edit-product/:id', ensureAuthenticated, (req, res) => {
        var imagef = typeof req.files.image !== "undefined" ? req.files.image.name : ""
        var id = req.params.id;
        var pimage = req.body.pimage
        console.log(pimage)
        Products.findOne({ 'tite': req.body.title }, (err, data) => {
            if (data) {
                req.flash('error', 'exist')
                console.log('exist')

                //			res.redirect('/admin/products/edit-product/'+id)
            } else {
                Products.findById(id, function(err, p) {

                    p.title = req.body.title,
                        p.desc = req.body.desc,
                        p.price = req.body.price,
                        p.discount = req.body.discount,
                        p.color = req.body.color,
                        p.size = req.body.size,
                        p.quantity = req.body.quantity,
                        p.category = req.body.category,
                        p.type = req.body.type,
                        p.type2 = req.body.type2,
                        p.brand = req.body.brand,
                        p.overview = req.body.overview
                    if (imagef != "") {
                        p.image = imagef
                    }
                    p.save((err) => {
                        if (imagef != "") {
                            if (pimage != "") {
                                fs.remove('public/product_images/' + id + '/' + pimage, function(err) {

                                })
                            }
                            var productImage = req.files.image
                            var path = 'public/product_images/' + id + '/' + imagef
                            productImage.mv(path, function(err) {
                                return console.log(err)
                            })
                        }
                        req.flash('success', 'added')

                        res.redirect('/admin/products/edit-product/' + id)


                    })
                })
            }
        })
    })



    app.post('/admin/products/product-gallery/:id', ensureAuthenticated, (req, res) => {
        var productImage = req.files.file
        var id = req.params.id
        var path = 'public/product_images/' + id + '/gallery/' + req.files.file.name
        var thumbsPath = 'public/product_images/' + id + '/gallery/thumbs/' + req.files.file.name

        productImage.mv(path, function(err) {
            console.log(err)

            resizeImg(fs.readFileSync(path), { width: 100, height: 100 }).then(function(buf) {
                fs.writeFileSync(thumbsPath, buf)
            })
        })
        res.sendStatus(200)
    })
    app.get('/admin/products/delete-image/:image', ensureAuthenticated, function(req, res) {
        var originalImage = 'public/product_images/' + req.query.id + '/gallery/' + req.params.image
        var thumbImage = 'public/product_images/' + req.query.id + '/gallery/thumbs/' + req.params.image

        fs.remove(originalImage, function(err) {
            if (err) {
                console.log(err)
            } else {
                fs.remove(thumbImage, function(err) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.redirect('/admin/products/edit-product/' + req.query.id)
                    }
                })
            }
        })
    })

    app.get('/admin/products/delete-product/:id', ensureAuthenticated, (req, res) => {
        var id = req.params.id
        var path = 'public/product_images/' + id;
        fs.remove(path, (err) => {
            Products.findByIdAndRemove(id, (err) => {
                console.log(err)
            })
            res.redirect('/admin/products')
        })


    })


}