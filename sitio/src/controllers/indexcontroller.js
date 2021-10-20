const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));
const db = require('../database/models')

module.exports = {
    index: (req, res) => {
        db.Product.findAll({
            include : ['images','productStates']
        })
        .then(products =>{
            res.render('index/index',{
                title: 'Ali Music',
                products
            })
        })
        .catch(err=>console.log(err))
        /* return res.render('index/index', {
            title: 'Ali Music',
            products
        }); */
    },
    about: (req, res) => {
        return res.render('index/about',{
            title: 'about',
        })
    },
    
}