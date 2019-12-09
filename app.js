const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
var passport = require('passport');

const userAuth = require('./api/user/routes/auth');
const adminAuth = require('./api/admin/routes/auth');

mongoose.connect('mongodb://127.0.0.1:27017/fyp',{ useNewUrlParser: true , useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('dev'));
require('./api/auth/passport')(passport);

app.use('/user/auth', userAuth);
app.use('/admin/auth',adminAuth);

module.exports.app = app;
