const {check} = require('express-validator');

module.exports=[
    check("name").notEmpty().withMessage("Debes indicar tu nombre"),
    check("lastName").notEmpty().withMessage("Debes indicar tu apellido"),
    check("number").isMobilePhone().withMessage("Debes indicar un numero de telefono valido"),
    check("email").notEmpty().withMessage("Debes indicar tu email"),
    check("password").notEmpty().withMessage("Debes indicar tu contraseña").isLength({max:20,min:6}).withMessage("Tu contraseña debe tener minimo 6 caracteres y maximo 20"),
    check("password2").notEmpty().withMessage("Debes repetir tu contraseña").custom((value,{req})=>{
        if(value == req.body.password){
            return true
        }
        return false
    }).withMessage("Las contraseñas deben coincidir")
]