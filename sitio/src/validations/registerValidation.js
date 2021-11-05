const { check } = require('express-validator');

module.exports = [
    check("firstName").notEmpty().withMessage("Debes indicar tu nombre").bail(),

    check("lastName").notEmpty().withMessage("Debes indicar tu apellido").bail(),

    check("userName").notEmpty().withMessage("Debes indicar un usuario").bail(),

    check("email").isEmail().withMessage("debes ingresar un email").notEmpty().withMessage("Debes indicar tu email").bail(),

    check("password").notEmpty().withMessage("Debes indicar tu contraseña").isLength({ max: 20, min: 6 }).withMessage("Tu contraseña debe tener minimo 6 caracteres y maximo 20").bail(),
    
    check("password2").notEmpty().withMessage("Debes repetir tu contraseña").custom((value, { req }) => {
        if (value == req.body.password) {
            return true
        }
        return false
    }).withMessage("Las contraseñas deben coincidir")
]