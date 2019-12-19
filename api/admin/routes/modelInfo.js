const express = require('express');
const router = express.Router();
const adminCheck = require('../../../middleware/adminCheck').checkAdmin;
const ModelInfo  = require('../models/modelInfoModel').ModelInfo;

router.use(adminCheck);
router.post('/add', async (req, res) => {
    try {
        /*model have to be use instead of null*/
        const modelInfo = new ModelInfo(req.body.modelFilePath,req.body.dataFilePath, req.body.algorithmId,
            req.body.features,null);
        
        await modelInfo.validate(req.body.algorithmId);
        await modelInfo.save();

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
        let modelInfo = await ModelInfo.get();
        res.cookie('token',req.cookies['token']).status(200).send({
            'result': modelInfo
        });
    }
    catch(error){
        res.status(400).send({
            'result': error
        });
    }
});

module.exports = router;