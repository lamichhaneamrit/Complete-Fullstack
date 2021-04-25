var Type = require('../models/type-model');
const { ensureAuthenticated } = require('../config/checkAuth')

module.exports = (app) => {

    app.get('/admin/type', ensureAuthenticated, (req, res) => {
        var success = req.flash('success')
        var errors = req.flash('error')
        Type.find({}, (err, type) => {

            res.render('admin/type', { success: success, noErrors: success.length > 0, error: errors, hasErrors: errors.length > 0, type: type })
        })
    })
    app.get('/admin/type/add-type', ensureAuthenticated, (req, res) => {
        res.render('admin/add_type')
    })
    app.get('/admin/type/edit-type/:id', ensureAuthenticated, (req, res) => {
        Type.findOne({ '_id': req.params.id }, (err, data) => {
            console.log(data)


            res.render('admin/edit_type', {
                data: data
            })
        })
    })

    app.get('/admin/type/delete-type/:id', ensureAuthenticated, (req, res) => {
        Type.findByIdAndRemove(req.params.id, (err, data) => {
            res.redirect('/admin/type')
        })
    })

    app.post('/admin/type/edit-type/:id', ensureAuthenticated, (req, res) => {
        var id = req.params.id;
        Type.findOne({ '_id': req.params.id }, (err, data) => {
            console.log(data)
            data.title = req.body.title
            data.save((err) => {
                req.flash('success', 'added')

                res.redirect('/admin/type/edit-type/' + id)

            })
        })
    })






    app.post('/admin/type/add-type', ensureAuthenticated, (req, res) => {
        Type.findOne({ 'title': req.body.title }, (err, data) => {
            if (data) {
                req.flash('error', 'page slug exists')
                res.redirect('/admin/type/add-type')
            } else {
                var type = new Type()
                type.title = req.body.title,


                    type.save((err) => {
                        req.flash('success', 'added')

                        res.redirect('/admin/type/add-type')
                    })


            }

        })



    })

}