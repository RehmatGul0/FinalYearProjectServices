const express = require('express');
const router = express.Router();
const adminCheck = require('../../../middleware/adminCheck').checkAdmin;
const Algorithm = require('../models/algorithmMODEL').Algorithm;

//router.use(adminCheck);
router.post('/add', async (req, res) => {
    try {
        const algorith = new Algorithm(req.body.algorithmName);
        await algorith.save();

        /*res.cookie('token',req.cookies['token']).status(200).send({
            'result': 'success'
        });*/
        res.status(200).send({
            'result': 'success'
        });
    } catch (error) {
        res.status(400).send({
            'result': error
        });
    }
});

router.get('/get', async (req, res, next) => {
    try {
        let algorithms = await Algorithm.get();

        /*res.cookie('token',req.cookies['token']).status(200).send({
            'result': algorithms
        });*/
        res.status(200).send({
            'result': algorithms
        });
    } catch (error) {
        res.status(400).send({
            'result': error
        });
    }

});

module.exports = router;