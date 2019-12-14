const express = require('express');
const router = express.Router();
const adminCheck = require('../../../middleware/adminCheck').checkAdmin;
const Question = require('../models/questionMODEL').Question;
const AlgorithmInfo  = require('../models/algorithmInfoModel').AlgorithmInfo;

router.use(adminCheck);
router.post('/add', async (req, res) => {
    try {
        const algorithmInfo = new AlgorithmInfo(req.body.numOfClusters, req.body.maxIterations , 
            req.body.randomState ,req.body.algorithmId,
            req.body.init, req.body.initialIterations );
        await algorithmInfo.validate(req.body.algorithmId);
        /*data file path have to use multer instead of null*/
        const question = new Question(req.body.question, null, req.body.answerPath, 
            req.admin , req.body.domainId,algorithmInfo);
        await question.validate(req.body.domainId);
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