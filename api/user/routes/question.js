const express = require('express');
const router = express.Router();
let {PythonShell} = require('python-shell')
const Question = require('../models/questionModel').Question;
const userCheck = require('../../../middleware/userCheck').checkUser;
//router.use(userCheck);
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

router.get('/getQuestion1',function (req,res) {
    let userId = 1                              // Need to get this from user session
    let students_per_section = 40                 // Need user input for number of sections
    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: 'Education Scripts/',//Path to your script
        args: ['/UserData/'+userId,students_per_section]
    };

    PythonShell.run('Question1.py',options, function (getQuestion1Err, getQuestion1Status) {
        if(getQuestion1Err){
            console.log(getQuestion1Err);
            res.send(getQuestion1Err);
        }
        else{
            if(getQuestion1Status[0] === '200'){
                console.log('Question 1 Answered successfully !');
                res.send('Question 1 answered successfully !');     // Send sections.csv in response.
            }
            else{
                console.log(getQuestion1Status)
                res.send('Something went wrong while answering Question 1 !');
            }

        }
    });
});
module.exports = router;