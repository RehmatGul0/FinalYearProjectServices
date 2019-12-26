const express = require('express');
const router = express.Router();
const adminCheck = require('../../../middleware/adminCheck').checkAdmin;
const Question = require('../models/questionMODEL').Question;
const ModelInfo  = require('../models/modelInfoModel').ModelInfo;

//router.use(adminCheck);
router.post('/add', async (req, res) => {
    try {
        console.log(req.body)
        /*model have to be use instead of null*/
        const question = new Question(req.body.question, req.body.answerPath, 
            'req.admin' , req.body.domainId, req.body.modelInfoId);
        
        await question.validate(req.body.domainId,req.body.modelInfoId);
        await question.save();

        res.cookie('token',req.cookies['token']).status(200).send({
            'result': 'success'
        });
    } catch (error) {
        res.status(400).send({
            'result': error
        });
    }
});

router.get('/get', async (req, res,next) => {
    try{
        let questions = await Question.get();
        res.cookie('token',req.cookies['token']).status(200).send({
            'result': questions
        });
    }
    catch(error){
        res.status(400).send({
            'result': error
        });
    }
});

module.exports = router;