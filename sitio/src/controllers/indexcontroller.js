const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));

module.exports = {
    index: (req, res) => {
        return res.render('index/index', {
            title: 'Ali Music',
            products
        });
    },
    about: (req, res) => {
        return res.render('index/about',{
            title: 'about',
        })
    },
    
}