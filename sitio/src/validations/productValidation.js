const {check} = require('express-validator');

module.exports=[
    check("name").notEmpty().withMessage("Debes indicar el nombre del producto").bail(),
    check("price").notEmpty().withMessage("Debes indicar el precio del producto").bail().isNumeric().withMessage("Solo se permiten números").bail(),
    check("discount").isInt({ min: 5, max: 90 }).withMessage("Solo se permiten números entre 5 y 90").bail(),
    check("category").notEmpty().withMessage("Por favor selecciona una categoria").bail(),
    check("description").notEmpty().withMessage("Debes dar una descripción del producto").isLength({min:6}).withMessage("La descripción debe tener minimo 6 caracteres").bail(),
]