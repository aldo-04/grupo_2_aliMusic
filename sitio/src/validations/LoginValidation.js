const {check} = require('express-validator');
const users = require('../data/users.json');
const bcrypt = require('bcryptjs');
const db = require('../database/models')

module.exports = [
    /* check('email')
    .isEmail().withMessage('Debe ingresar un email ').bail()
    .custom((value,{req}) => {
        return db.User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if(!user || !bcryptjs.compareSync(req.body.password, user.password)){
                    return Promise.reject()
                }
            }).catch( () => Promise.reject('Credenciales inválidas'))
            
    }).withMessage('Credenciales inválidas'),
    
    check('password')
    .notEmpty().withMessage('El campo de contraseña no puede estar vacío') */
]