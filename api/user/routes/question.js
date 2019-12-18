const express = require('express');
const router = express.Router();
const Question = require('../models/questionModel').Question;
const userCheck = require('../../../middleware/userCheck').checkUser;
router.use(userCheck);
router.get('/get', async (req, res) => {
    try {
        let questions = await Question.get();
            
        res.header('token',req.cookies['token']).status(200).send({
                'result': questions
        });
    } catch (error) {
        res.status(400).send({
            'result': error
        });
    }
});
module.exports = router;