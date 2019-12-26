let {PythonShell} = require('python-shell')
const express = require('express');
const router = express.Router();
module.exports.model = function (modelFilePath,dataFile) {
    return new Promise((resolve,reject) => {
            let ModelState;
            let options = {
                mode: 'text',
                pythonOptions: ['-u'],
                scriptPath: modelFilePath,//Path to your script
                args: [dataFile]
            };

           PythonShell.run('FillEmptyValues.py',options, function (FillEmptyErr, getFillValueStatus) {
                //On 'results' we get list of strings of all print done in your py scripts sequentially.
                if (FillEmptyErr){
                    reject(FillEmptyErr);
                }
                else {
                    if(getFillValueStatus[0] === '200'){
                        PythonShell.run('RemoveOutliers.py',options, function (removeOutlierErr, getRemoveOutlierStatus) {
                            //On 'results' we get list of strings of all print done in your py scripts sequentially.
                            if (removeOutlierErr){
                              reject(removeOutlierErr)
                            }
                            else{
                              if(getRemoveOutlierStatus[0] === '200'){
                                  PythonShell.run('KmeansModel.py',options, function (ModelingErr, getModelState) {
                                      //On 'results' we get list of strings of all print done in your py scripts sequentially.
                                      if (ModelingErr){
                                          console.log(ModelingErr);
                                          reject(ModelingErr);
                                      }
                                      else{
                                          console.log('Model trained successfully')
                                          resolve('Model Trained Successfully');
                                      }
                                  });
                              }
                              else{
                                  reject('Something is wrong in removing outliers')
                              }
                            }
                        });
                    }
                    else{
                        reject('Something is wrong in Filling empty values')
                    }
                }
            });
    })
};