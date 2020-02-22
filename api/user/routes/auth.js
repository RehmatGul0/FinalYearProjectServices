const express = require('express');
const router = express.Router();
const User = require('../models/userMODEL').User;
const createTokenUser = require('../../auth/token').createTokenUser;
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
            const _token = await createTokenUser(req.body.email);
            res.status(200).send({
                'result': {email:user._email,name:user._name,token:_token}
            });
        }
    })(req, res,next);
});

module.exports = router;