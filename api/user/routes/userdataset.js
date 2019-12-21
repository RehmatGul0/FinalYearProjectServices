let {PythonShell} = require('python-shell')
const express = require('express');
const router = express.Router();
router.get('/',function (req,res) {

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: 'Education Scripts/',//Path to your script
        args: ['/UserData/1/userDataSet.csv']
    };

    PythonShell.run('UserDataModeling.py',options, function (UserModelingErr, userModelingStatus) {
        if(UserModelingErr){
            console.log(UserModelingErr);
            res.send(UserModelingErr);
        }
        else{
            if(userModelingStatus[0] === '200'){
                console.log('User Data Successfully predicted!');
                res.send('User Data Successfully predicted!');
            }
            else{
                res.send('Something went wrong while dealing with user data !');
            }

        }
    });


});
module.exports = router;