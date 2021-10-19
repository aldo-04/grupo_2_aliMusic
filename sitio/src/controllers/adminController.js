const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));
const categories = require('../data/categories.json');
const capitalizarPrimeraLetra = require('../utils/capitalizeOneLetter.js');
const db = require('../database/models')
const queryInterface = db.sequelize.getQueryInterface();


module.exports = {
    index: (req, res) => {
        db.Product.findAll({
            include : ['images','productStates']
        })
        .then(products =>{
            res.render('admin/index',{
                title: 'admin',
                products
            })
        })
        .catch(err=>console.log(err))
    },
    add: (req, res) => {
        db.Category.findAll({
            order : [
                ['category','ASC']
            ]
        })
            .then(categories => res.render('admin/add', {
                title: 'add product',
                categories,
                capitalizarPrimeraLetra,
            }))
            .catch(error => console.log(error))
        
    },
    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            const {name, price, discount,category,description } = req.body
            const status = 1
            
            db.Product.create(
                {
                    name: name.trim(),
                    price,
                    discount,
                    categoryId: category,
                    description: description.trim(),
                    fav: 0,
                    sold: 0,
                    cart: 0,
                    statusId: status
                }
            )
                .then(product => {
                    console.log(product)
                    if (req.files.length != 0) {
                        let images = req.files.map(image =>{
                            let item = {
                                image: image.filename,
                                productId: product.id
                            }
                            return item
                        })
                        db.ImageProduct.bulkCreate(images,{validate: true})
                            .then( () => console.log('imagenes guardadas satisfactoriamente'))
                    }
                    return res.redirect('/admin')
                })
                .catch(error => console.log(error))
        }
    },
    edit: (req, res) => {
        let product = db.Product.findByPk(req.params.id,{
            include : ['images','productStates','category']
        })

        let categories = db.Category.findAll({
            order : [["id","ASC"]]
        })

        Promise.all([categories,product])

        .then(([categories,product])=>{
            res.render('admin/edit',{
                title: 'Edit product',
                product,
                categories
            })
        })
        .catch(err=>{console.log(err)})
    },
    update: (req, res) => {
         const {name,description, price, discount, category} = req.body;
         db.Product.update(
            {
                name: name.trim(),
                price,
                discount,
                categoryId: category,
                description: description.trim(),
            },
            {
                where: {id:req.params.id}
            }
        )   .then(()=>{
                db.ImageProduct.findByPk(req.params.id,{
                    include : ['product']
                })
                .then(async () => {
                    if (req.files.length != 0) {
                        let images = req.files.map(image =>{
                            let item = {
                                image: image.filename,
                                productId: req.params.id
                            }
                            return item
                        })
                        await queryInterface.bulkDelete('imageproducts', {
                            productId : req.params.id
                        });
                        db.ImageProduct.bulkCreate(images,{validate: true, updateOnDuplicate: ["productId"] })
                            .then( () => console.log('imagenes guardadas satisfactoriamente'))
                    }
                    return res.redirect('/admin')
                })
                .catch(error => console.log(error))
            })      
        },
    destroy: (req, res) => {
            db.Product.findByPk(req.params.id,{
                include: ['images']
            })
                .then(() => {
                    db.ImageProduct.destroy({
                        where: {
                            productId: +req.params.id 
                        }
                    })
                    db.Product.destroy({
                        where: {
                            id: +req.params.id
                        }
                    })
                    return res.redirect('/admin')
                })
    },
}