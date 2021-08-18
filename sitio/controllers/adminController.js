const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));
const categories = require('../data/categories.json');
const capitalizarPrimeraLetra = require('../src/public/javascripts/capitalizeOneLetter.js');
module.exports = {
    index: (req, res) => {
        return res.render('admin/index',{
            title: 'admin',
            products
        })
    },
    add: (req, res) => {
        res.render('admin/add',{
            title: 'add product', /* Aca agregamos un producto */
            categories,
            capitalizarPrimeraLetra,
        })
        return res.send(req.file)
    },
    edit: (req, res) => {
        return res.render('admin/edit',{
            title: 'Edit product' /* Aca editamos un producto */
        })
    },
    update: (req, res) => {
        return res.render('admin/update',{
            title: 'Update product'/* Aca editamos el producto */
        })
    },
    destroy: (req, res) => {
        return res.render('admin/destroy',{
            title: 'delete product' /* Aca deletamos un producto */
        })
    },
}