const bcrypt = require('bcryptjs');
const userDAO = require('../userDAO/userDAO').UserDAO;
module.exports.User = class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = false;
    }
    async save() {
        return new Promise(async (resolve, reject) => {
            bcrypt.hash(this.password, 10, async (error, hash)=> {
                if (error) reject(error);
                try{
                    let user = await userDAO.add(this,hash);
                    resolve(user);
                }
                catch(error){
                    reject(error);
                }
            });
        });

    }
    async getByEmail(email) {
        return new Promise(async (resolve, reject) => {
            let user = await await userDAO.getByEmail(email);
            if(!user) reject('No document found')
            else resolve(user);
        });
    }
}