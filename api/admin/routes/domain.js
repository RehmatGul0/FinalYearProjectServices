const express = require('express');
const router = express.Router();
const adminCheck = require('../../../middleware/adminCheck').checkAdmin;
const Domain = require('../models/domainModel').Domain;

router.use(adminCheck);
router.post('/add', async (req, res) => {
    try {
        const domain = new Domain(req.body.domainName);
        await domain.save();

        res.cookie('token',req.cookies['token']).status(200).send({
            'result': 'success'
        });
    } catch (error) {
        res.status(400).send({
            'result': error
        });
    }
});

router.post('/get', (req, res, next) => {

});

module.exports = router;