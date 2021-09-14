const {check} = require('express-validator');
module.exports = [
    check('email')
    .isEmail().withMessage('Debe ingresar un email válido').bail(),
    check('password')
    .notEmpty().withMessage('El campo contraseña no puede estar vacío')
]