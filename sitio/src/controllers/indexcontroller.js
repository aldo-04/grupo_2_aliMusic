/* const fs = require('fs'); */
const path = require('path');
/* const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8')); */
const db = require('../database/models')
const {Op} = require('sequelize')

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
    },
    about: (req, res) => {
        return res.render('index/about',{
            title: 'about',
        })
    },
    search : (req, res) => {

        let products = db.Product.findAll(
                {
                    where: {
                        [Op.or]: [{ description: {[Op.substring]:req.query.search} }, { name: {[Op.substring]:req.query.search} }]
                    },
                    include : ['images','productStates',"category"]
                }
                )
        let categories = db.Category.findAll()

        Promise.all([categories,products])

        .then(([categories,products]) => {
            
            res.render("search",{
                old : req.query,
                categories,
                products,
                title : "Busqueda"
            })
        })
        .catch(err=>console.log(err))
    }
    
}