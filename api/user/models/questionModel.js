const questionDAO = require('../../../sharedDAO/questionDAO').QuestionDAO;

module.exports.Question = class Question {
    static async getById(id) {
        return new Promise(async (resolve, reject) => {
            let question = await questionDAO.getById(id);
            if(!question) reject('No document found')
            else resolve(question);
        });
    }
    static async get() {
        let questions = await questionDAO.get();
        return questions.map(question => {
            return { '_id':question._id ,
            'question':question._question,
            'domainId':question._domain._id,
            'domainName':question._domain._name};
        });
    }
}