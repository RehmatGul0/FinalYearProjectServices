const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/fyp',
{
    useMongoClient:true
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports.app = app;

