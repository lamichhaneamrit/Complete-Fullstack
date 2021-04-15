const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
var multer = require('multer');
var request = require('request');
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());
var fileUpload = require('express-fileupload')
const formidable = require("formidable");
const ejsLint = require('ejs-lint');


//------------ Passport Configuration ------------//
require('./config/passport')(passport);



//------------ DB Configuration ------------//

const db = require('./config/key').MongoURI;

//------------ Mongo Connection ------------//
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Successfully connected to MongoDB ..."))
    .catch(err => console.log(err));

//------------ EJS Configuration ------------//
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload())

//------------ Bodyparser Configuration ------------//
app.use(express.urlencoded({ extended: false }))

//------------ Express session Configuration ------------//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

//------------ Connecting flash ------------//
app.use(flash());

//------------ Global variables ------------//
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
//------------ Routes ------------//
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));


app.get('*', function(req, res, next) {
    res.locals.cart = req.session.cart;

    next();
});
//set routes

require('./controllers/adminProducts')(app);
require('./controllers/admin_cat')(app);
require('./controllers/admin_type')(app);
require('./controllers/admin_brand')(app);
require('./controllers/admin_cat')(app);
require('./controllers/cart')(app);
require('./controllers/pages')(app);








const PORT = process.env.PORT || 3006;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));