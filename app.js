const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors')
const passport = require('passport');
const cookieParser = require('cookie-parser');

const userAuth = require('./api/user/routes/auth');
const adminAuth = require('./api/admin/routes/auth');
const adminDomain = require('./api/admin/routes/domain');
const adminAlgorithm = require('./api/admin/routes/algorithm');
const adminQuestion = require('./api/admin/routes/question');


mongoose.connect('mongodb://127.0.0.1:27017/fyp',{ useNewUrlParser: true , useUnifiedTopology: true});
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(cors())
require('./api/auth/passport')(passport);

app.use('/user/auth', userAuth);
app.use('/admin/auth',adminAuth);
app.use('/admin/domain',adminDomain);
app.use('/admin/algorithm',adminAlgorithm);
app.use('/admin/question',adminQuestion);

module.exports.app = app;
