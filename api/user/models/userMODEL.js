const bcrypt = require('bcryptjs');
const _user = require('../../../models/User').User;
module.exports.User = class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = false;
    }
    async save() {
        return new Promise(async (resolve, reject) => {
            bcrypt.hash(this.password, 10, function (error, hash) {
                if (error) reject(error);
                _user.create({
                        _name: this.name,
                        _email: this.email,
                        _password: hash,
                        _isAdmin: this.isAdmin
                    },
                    (error, doc) => {
                        if (error) reject(error);
                        else resolve(doc);
                    }
                )
            });
        });

    }
    async getByEmail(email) {
        return new Promise(async (resolve, reject) => {
            let user = await _user.findOne({_email: email}).lean();
            if(!user) reject('No document found')
            else resolve(user);
        });
    }
}