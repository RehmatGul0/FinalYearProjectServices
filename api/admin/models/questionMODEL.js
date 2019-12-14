const questionDAO = require('../adminDAO/questionDAO').QuestionDAO;
const domain = require('../models/domainModel').Domain;

module.exports.Question = class Question {
    constructor(question, dataFilePath , answerPath, adminEmail , domainId, algorithmInfo) {
        this.question = question;
        this.dataFilePath = dataFilePath;
        this.answerPath = answerPath;
        this.adminEmail = adminEmail;
        this.domainId = domainId;
        this.algorithmInfo=algorithmInfo;
    }
    async save() {
        return new Promise(async (resolve, reject) => {
           try{
                resolve(await questionDAO.add(this));
           }
           catch(error){
               reject(error);
           }
        });
    }
    async validate(domainId){
        return new Promise(async (resolve, reject) => {
            if(domainId===undefined || domainId === null) reject('Invalid input')
            try{
                await domain.getById(domainId);
                resolve();
            }
            catch(error){
                reject('Invalid input')
            }
        });
    }
    static async getById(id) {
        return new Promise(async (resolve, reject) => {
            let question = await questionDAO.getById(id);
            if(!question) reject('No document found')
            else resolve(question);
        });
    }
    static async get() {
        return await questionDAO.get();
    }
}