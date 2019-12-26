const express = require('express');
const router = express.Router();
const adminCheck = require('../../../middleware/adminCheck').checkAdmin;
const ModelInfo  = require('../models/modelInfoModel').ModelInfo;
const upload = require('../../../multer/storage').uploadAdmin.single('dataFile');
const model = require('../models/GetModelState').model;

//router.use(adminCheck);
router.post('/add' ,upload, async (req, res) => {
    try {
        let status = await model(req.body.modelFilePath+'/','/ModelingData/'+req.file.originalname);
        const modelInfo = new ModelInfo(req.body.modelFilePath,req.file.originalname, req.body.algorithmId,
            req.body.features,null);
        
        await modelInfo.validate(req.body.algorithmId);
        await modelInfo.save();

        res.cookie('token',req.cookies['token']).status(200).send({
            'result': 'success'
        });
        res.status(200).send();
    } 
    catch (error) {
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