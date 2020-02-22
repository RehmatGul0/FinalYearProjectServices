const express = require('express');
require('dotenv').config()
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors')
const passport = require('passport');
const cookieParser = require('cookie-parser');

const userAuth = require('./api/user/routes/auth');
const userQuestion = require('./api/user/routes/question');

const adminAuth = require('./api/admin/routes/auth');
const adminDomain = require('./api/admin/routes/domain');
const adminAlgorithm = require('./api/admin/routes/algorithm');
const adminQuestion = require('./api/admin/routes/question');
const adminModelInfo = require('./api/admin/routes/modelInfo');
const UserDataset = require('./api/user/routes/userdataset');

mongoose.connect(process.env.db,{ useNewUrlParser: true , useUnifiedTopology: true});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
require('./api/auth/passport')(passport);

app.use('/user/auth', userAuth);
app.use('/user/question',userQuestion);

app.use('/admin/auth',adminAuth);
app.use('/admin/domain',adminDomain);
app.use('/admin/algorithm',adminAlgorithm);
app.use('/admin/question',adminQuestion);
app.use('/admin/modelinfo',adminModelInfo);
app.use('/user/userdataset',UserDataset);


module.exports.app = app;
