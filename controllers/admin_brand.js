var Brand = require('../models/brand-model');
const { ensureAuthenticated } = require('../config/checkAuth')


module.exports = (app) => {

    app.get('/admin/brand', ensureAuthenticated, (req, res) => {
        var success = req.flash('success')
        var errors = req.flash('error')
        Brand.find({}, (err, brand) => {

            res.render('admin/brand', { success: success, noErrors: success.length > 0, error: errors, hasErrors: errors.length > 0, brand: brand })
        })
    })
    app.get('/admin/brand/add-brand', ensureAuthenticated, (req, res) => {
        res.render('admin/add_brand')
    })
    app.get('/admin/brand/edit-brand/:id', ensureAuthenticated, (req, res) => {
        Brand.findOne({ '_id': req.params.id }, (err, data) => {
            console.log(data)


            res.render('admin/edit_brand', {
                data: data
            })
        })
    })

    app.get('/admin/brand/delete-brand/:id', ensureAuthenticated, (req, res) => {
        Brand.findByIdAndRemove(req.params.id, (err, data) => {
            res.redirect('/admin/brand')
        })
    })

    app.post('/admin/brand/edit-brand/:id', ensureAuthenticated, (req, res) => {
        var id = req.params.id;
        Brand.findOne({ '_id': req.params.id }, (err, data) => {
            console.log(data)
            data.title = req.body.title
            data.save((err) => {
                req.flash('success', 'added')

                res.redirect('/admin/brand/edit-brand/' + id)

            })
        })
    })






    app.post('/admin/brand/add-brand', ensureAuthenticated, (req, res) => {
        Brand.findOne({ 'title': req.body.title }, (err, data) => {
            if (data) {
                req.flash('error', 'page slug exists')
                res.redirect('/admin/brand/add-brand')
            } else {
                var brand = new Brand()
                brand.title = req.body.title,
                    brand.type = req.body.type

                brand.save((err) => {
                    req.flash('success', 'added')

                    res.redirect('/admin/brand/add-brand')
                })


            }

        })



    })

}