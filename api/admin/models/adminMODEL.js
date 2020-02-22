const bcrypt = require('bcryptjs');
const adminDAO = require('../adminDAO/adminDAO').AdminDAO;
module.exports.Admin = class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = true;
    }
    async save() {
        return new Promise(async (resolve, reject) => {
            bcrypt.hash(this.password, 10, async (error, hash)=> {
                if (error) reject(error);
                try{
                    console.log()
                    let admin = await adminDAO.add(this,hash);
                    resolve(admin);
                }
                catch(error){
                    console.log(error)
                    reject(error);
                }
            });
        });
    }
    static async getByEmail(email) {
        return new Promise(async (resolve, reject) => {
            let admin = await adminDAO.getByEmail(email);
            if(!admin) reject('No document found')
            else resolve(admin);
        });
    }
}