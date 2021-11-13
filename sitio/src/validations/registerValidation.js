const { check } = require('express-validator');
const db = require('../database/models')

let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

module.exports = [
    check("firstName").notEmpty().withMessage("Debes indicar tu nombre").bail(),

    check("lastName").notEmpty().withMessage("Debes indicar tu apellido").bail(),

    check("userName").notEmpty().withMessage("Debes indicar un usuario").bail(),

    check("email").notEmpty().custom( value => {
        return db.User.findOne({
            where : {
                email : value
            }
        })
            .then(user => {
                if(user){
                    return Promise.reject('El email ya se encuentra registrado')
                }
            })
           
    }).isEmail().withMessage("Debes ingresar un email valido").bail(),

    check("password").notEmpty().withMessage("Debes indicar tu contraseña").isLength({ max: 20, min: 6 }).withMessage("Tu contraseña debe tener minimo 6 caracteres y maximo 20").matches(regExPass).withMessage('lkhbjasdkhjadskhbasdkhasdkhbasd').bail(),
    
    check("password2").notEmpty().withMessage("Debes repetir tu contraseña").custom((value, { req }) => {
        if (value == req.body.password) {
            return true
        }
        return false
    }).withMessage("Las contraseñas deben coincidir")
]
/* if (!regExPass.test.password) {
            return Promise.reject('NO ES VALIDO')
        }else{
            Promise.resolve()
        } */