const _question = require('../../../models/Question').Question;
class QuestionDAO {
    async add(question) {
        return new Promise(async (resolve, reject) => {
            _question.create({
                _question : question.question ,
                _dataFilepath : question.dataFilePath,
                _answerPath : question.asnswerPath, 
                _adminEmail : question.adminEmail,
                _domainId : question.domainId,
                _algorithmInfo : {
                    _numOfClusters : question.algorithmInfo.numOfClusters,
                    _maxIterations : question.algorithmInfo.maxIterations,
                    _randomState : question.algorithmInfo.randomState,
                    _init : question.algorithmInfo.init,
                    _initialIterations : question.algorithmInfo.initialIterations,
                    _algorithmId : question.algorithmInfo.algorithmId,
                    _model: question.algorithmInfo.model
                }
                },
                (error, doc) => {
                    if (error) reject(error);
                    else resolve(doc);
                }
            )
        });
    }
    async getById(id){
        return await _question.findOne({_id: id}).lean();
    }
    async get(){
        return await _question.find().lean()
        .populate('_domainId')
        .populate('_algorithmInfo._algorithmId');
    }
}
module.exports.QuestionDAO = new QuestionDAO();
