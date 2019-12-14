const express = require('express');
const router = express.Router();
const User = require('../models/adminMODEL').Admin;
const createToken = require('../../auth/token').createTokenAdmin;
var passport = require('passport');
router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body.name, req.body.email, req.body.password);
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
            const _token = createToken(req.body.email);
            res.cookie('token',_token).status(200).send({
                'result': {email:user._email,name:user._name}
            });
        }
    })(req, res,next);
});

module.exports = router;