let {PythonShell} = require('python-shell')
const express = require('express');
const router = express.Router();

const upload = require('../../../multer/storage').uploadUser.single('dataFile');

router.post('/',upload,function (req,res) {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: 'Education Scripts/',//Path to your script
        args: ['/UserData/5decfef030a55e28905ec2c0/'+'userDataSet.csv']
    };

    PythonShell.run('UserDataModeling.py',options, function (UserModelingErr, userModelingStatus) {
        if(UserModelingErr){
            console.log(UserModelingErr);
            res.send(UserModelingErr);
        }
        else{
            if(userModelingStatus[0] === '200'){
                res.status(200).send({result:"success"});
            }
            else{
                res.send({result:"error"});
            }

        }
    });


});
module.exports = router;