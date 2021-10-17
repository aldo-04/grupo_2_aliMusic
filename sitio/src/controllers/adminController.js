const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));
const categories = require('../data/categories.json');
const capitalizarPrimeraLetra = require('../utils/capitalizeOneLetter.js');
const db = require('../database/models')


module.exports = {
    index: (req, res) => {
        return res.render('admin/index',{
            title: 'admin',
            products
        })
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
        /* return res.render('admin/add',{
            title: 'add product',
            categories,
            capitalizarPrimeraLetra,
        }) */
        
    },
    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            const {name, price, discount,category,description } = req.body
            const image = req.file
            
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
                    statusId:1
                }
            )
                .then(product => {
                    console.log(product)
                    if (req.files.length != 0) {
                        let images = req.files.map(image =>{
                            let item = {
                                file: image.filename,
                                productId: product.id
                            }
                            return item
                        })
                        db.Image.bulkCreate(images,{validate: true})
                            .then( () => console.log('imagenes guardadas satisfactoriamente'))
                    }
                    return res.redirect('/admin')
                })
                .catch(error => console.log(error))
        }
        /* const {name,description, price, discount, category} = req.body;
        product = {
            id : products[products.length - 1].id + 1,
            name: name.trim(),
            description : description.trim(),
            price : +price,
            discount : +discount,
            category : category,
            fav: false,
            image : req.file ? req.file.filename : 'art-default.png',
            sold: false,
            status : discount>0 ? "discount" : "new"
        }
        products.push(product),
        fs.writeFileSync(path.join(__dirname, '../data/products.json'),JSON.stringify(products,null,2),"utf-8")
        res.redirect("/admin") */
    },
    edit: (req, res) => {
        let product = products.find(product => product.id === +req.params.id);
        return res.render('admin/edit',{
            title: 'Edit product', /* Aca editamos un producto */
            products,
            product,
            categories
        })
    },
    update: (req, res) => {
         const {name,description, price, discount, category} = req.body;
         products.find(product=>{
            if(product.id === +req.params.id){
                product.name = name
                product.price = +price
                product.description = description.trim(),
                product.price = +price,
                product.discount = +discount,
                product.category = category
                if (req.file) {
                    product.image = req.file.filename
                    }
                } 
            if (product.status === "discount" && product.discount <= 0) {
                product.status = "visited"
            }else{
                product.status = "discount"
            }
         })
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'),JSON.stringify(products,null,2),'utf-8');
        res.redirect("/admin")
         
        },
    destroy: (req, res) => {
        var productosModificados = products.filter(product => {
            return product.id !== +req.params.id
        })
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'),JSON.stringify(productosModificados,null,2),'utf-8');
        res.redirect('/admin')
    },
}