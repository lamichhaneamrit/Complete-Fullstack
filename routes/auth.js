const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = express.Router();
var multer = require('multer');
const formidable = require("formidable");

//------------ Storing Files---------------------//
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "../FinalRegistration/public/Files")
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
});

var upload = multer({
    storage: Storage
}).single("file");


//------------ Importing Controllers ------------//
const authController = require('../controllers/authController');



//------------ Login Route ------------//
router.get('/login', (req, res) => res.render('login'));

//------------ Forgot Password Route ------------//
router.get('/forgot', (req, res) => res.render('forgot'));

//------------ Reset Password Route ------------//
router.get('/reset/:id', (req, res) => {
    // console.log(id)
    res.render('reset', { id: req.params.id })
});
//Admin section 



//------------ Register Route ------------//
router.get('/register', (req, res) => res.render('register'));

//------------ Register POST Handle ------------//
router.post('/register', upload, authController.registerHandle);

//------------ Email ACTIVATE Handle ------------//
router.get('/activate/:token', authController.activateHandle);

//------------ Forgot Password Handle ------------//
router.post('/forgot', authController.forgotPassword);

//------------ Reset Password Handle ------------//
router.post('/reset/:id', authController.resetPassword);

//------------ Reset Password Handle ------------//
router.get('/forgot/:token', authController.gotoReset);

//------------ Login POST Handle ------------//
router.post('/login', authController.loginHandle);

//------------ Logout GET Handle ------------//
router.get('/logout', authController.logoutHandle);

//----------------------------------------------//
router.get('/admin/products', (req, res) => {
    res.render('products')
});


module.exports = router;