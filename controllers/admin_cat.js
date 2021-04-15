var Cat = require('../models/cat-model');
const { ensureAuthenticated } = require('../config/checkAuth')


module.exports = (app) => {

    app.get('/admin/categories', ensureAuthenticated, (req, res) => {
        var success = req.flash('success')
        var errors = req.flash('error')
        Cat.find({}, (err, cat) => {

            res.render('admin/categories', { success: success, noErrors: success.length > 0, error: errors, hasErrors: errors.length > 0, cat: cat })
        })
    })
    app.get('/admin/categories/add-category', ensureAuthenticated, (req, res) => {
        res.render('admin/add_category')
    })
    app.get('/admin/categories/edit-category/:id', ensureAuthenticated, (req, res) => {
        Cat.findOne({ '_id': req.params.id }, (err, data) => {
            console.log(data)
            var title = data.title
            var id = data._id
            res.render('admin/edit_category', {
                title: title,
                id: id
            })
        })
    })

    app.get('/admin/categories/delete-category/:id', ensureAuthenticated, (req, res) => {
        Cat.findByIdAndRemove(req.params.id, (err, data) => {
            res.redirect('/admin/categories')
        })
    })

    app.post('/admin/categories/edit-category/:id', ensureAuthenticated, (req, res) => {
        var id = req.params.id;
        Cat.findOne({ '_id': req.params.id }, (err, data) => {
            console.log(data)
            data.title = req.body.title
            data.save((err) => {
                req.flash('success', 'added')

                res.redirect('/admin/categories/edit-category/' + id)

            })
        })
    })






    app.post('/admin/categories/add-category', ensureAuthenticated, (req, res) => {
        Cat.findOne({ 'title': req.body.title }, (err, data) => {
            if (data) {
                req.flash('error', 'page slug exists')
                res.redirect('/admin/categories/add-category')
            } else {
                var cat = new Cat()
                cat.title = req.body.title,
                    cat.slug = req.body.title

                cat.save((err) => {
                    req.flash('success', 'added')

                    res.redirect('/admin/categories/add-category')
                })


            }

        })



    })

}