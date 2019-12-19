let {PythonShell} = require('python-shell')
const express = require('express');
const router = express.Router();
router.get('/',function (req,res) {
            let ModelState;
            let options = {
                mode: 'text',
                pythonOptions: ['-u'],
                scriptPath: 'G:/FinalYear/venv/',//Path to your script
                args: ['/ModelingData/Modeling.csv']
            };

           PythonShell.run('FillEmptyValues.py',options, function (FillEmptyErr, getFillValueStatus) {
                //On 'results' we get list of strings of all print done in your py scripts sequentially.
                if (FillEmptyErr){
                    res.send(FillEmptyErr);
                }
                else {
                    if(getFillValueStatus[0] === '200'){
                        PythonShell.run('RemoveOutliers.py',options, function (removeOutlierErr, getRemoveOutlierStatus) {
                            //On 'results' we get list of strings of all print done in your py scripts sequentially.
                            if (removeOutlierErr){
                              res.send(removeOutlierErr)
                            }
                            else{
                              if(getRemoveOutlierStatus[0] === '200'){
                                  PythonShell.run('KmeansModel.py',options, function (ModelingErr, getModelState) {
                                      //On 'results' we get list of strings of all print done in your py scripts sequentially.
                                      if (ModelingErr){
                                          console.log(ModelingErr);
                                          res.send(ModelingErr);
                                      }
                                      else{
                                          ModelState = getModelState;
                                          console.log('Model trained successfully')
                                          res.send('Model Trained Successfully')
                                      }
                                  });
                              }
                              else{
                                  res.send('Something is wrong in removing outliers')
                              }
                            }
                        });
                    }
                    else{
                        res.send('Something is wrong in Filling empty values')
                    }
                }
            });

});
module.exports = router;