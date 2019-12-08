const express = require('express');
const router = express.Router();
const User = require('../models/userMODEL').User;
const getToken = require('../../auth/token').getToken;
var passport = require('passport');
router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body.name, req.body.email, req.body.password);
        //user.validate();
        await user.save();
        res.status(200).send({
            'result': 'success'
        });
    } catch (error) {
        res.status(400).send({
            'result': error
        });
    }
});

router.post('/signin', (req, res,next) => {
    passport.authenticate("local", async (error, user) => {
        if (error)
            res.status(400).send({
                'result': error
            });
        else {
            const _token = await getToken(req.body.email,user[0]._isAdmin);
            res.header("x-auth-token", _token).status(200).send({
                'result': user
            });
        }
    })(req, res,next);
});

module.exports = router;