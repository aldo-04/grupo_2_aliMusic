const { validationResult } = require('express-validator');
const capitalizeOneLetter = require('../utils/capitalizeOneLetter');
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const {Op} = require('sequelize');

const bcryptjs = require('bcryptjs');

const getUrl = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`

module.exports = {
    getMails: async (req, res) => {
        try {
            let result = await db.User.findAll({
                attributes: ['email']
            })
            let emails = result.map(user => user.email)
            return res.status(200).json({
                meta: {
                    link: getUrl(req),
                    total: emails.length
                },
                data: emails
            })
        } catch (error) {
            console.log(error)
            throwError(res, error)
        }
    },
    allProducts: async(req, res) => {
        try {
            let products = await db.Product.findAll({
                include : ['images','productStates',"category"],
                order: [["id","DESC"]]
            })
            let response ={
                status : 200,
                meta : {
                    link : getUrl(req),
                    total : products.length
                },
                data : products
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },
    orderPriceDesc: async (req,res)=> {
        let products
        try {
            if(req.query.search){
                if(req.query.price){
                    products = await db.Product.findAll({
                        include : ['images','productStates',"category"],
                        where : {
                            [Op.or] : [{name : {[Op.substring] : req.query.search }},{description : {[Op.substring] : req.query.search }}],
                            [Op.and] : {price : { [Op.lte] : req.query.price }}
                        },
                        order: [ ["price","DESC"] ],
                    })
                }else{
                    products = await db.Product.findAll({
                        include : ['images','productStates',"category"],
                        where : {
                            [Op.or] : [{name : {[Op.substring] : req.query.search }},{description : {[Op.substring] : req.query.search }}]
                        },
                        order: [ ["price","DESC"] ],
                    })
                }
            }else if(req.query.price){
                    products = await db.Product.findAll({
                        include : ['images','productStates',"category"],
                        where : {
                             price : { [Op.lte] : req.query.price } 
                            },
                        order: [ ["price","DESC"] ],
                    })
            }else{
                products = await db.Product.findAll({
                    include : ['images','productStates',"category"],
                    order: [ ["price","DESC"] ],
                })
            }
            let response = {
                status: 200,
                meta: {
                    tipo: req.query.category,
                    total: products.length,
                    link: getUrl(req),
                    price: products.map(product=>product.price)
                },
                data: products
            }
            return res.status(200).json(response)
        } catch (error) { console.log(error) }
    },
    orderPrice: async (req,res)=> {
        let products
        try {
            if(req.query.search){
                if(req.query.price){
                    products = await db.Product.findAll({
                        include : ['images','productStates',"category"],
                        where : {
                            [Op.or] : [{name : {[Op.substring] : req.query.search }},{description : {[Op.substring] : req.query.search }}],
                            [Op.and] : {price : { [Op.lte] : req.query.price }}
                        },
                        order: [ ["price","ASC"] ],
                    })
                }else{
                    products = await db.Product.findAll({
                        include : ['images','productStates',"category"],
                        where : {
                            [Op.or] : [{name : {[Op.substring] : req.query.search }},{description : {[Op.substring] : req.query.search }}]
                        },
                        order: [ ["price","ASC"] ],
                    })
                }
            }else if(req.query.price){
                    products = await db.Product.findAll({
                        include : ['images','productStates',"category"],
                        where : {
                             price : { [Op.lte] : req.query.price } 
                            },
                        order: [ ["price","ASC"] ],
                    })
            }else{
                products = await db.Product.findAll({
                    include : ['images','productStates',"category"],
                    order: [ ["price","ASC"] ],
                })
            }
            let response = {
                status: 200,
                meta: {
                    total: products.length,
                    link: getUrl(req),
                    price: products.map(product=>product.price)
                },
                data: products
            }
            return res.status(200).json(response)
        } catch (error) { console.log(error) }
    },
    filterPrice : async (req, res) => {
        let products
        try {
            if(req.query.search && !req.query.price){
                products = await db.Product.findAll({
                    include : ['images','productStates',"category"],
                    where : {
                        [Op.or] : [
                            { name : { [Op.substring] : req.query.search } },
                            { description : { [Op.substring] : req.query.search } }
                        ]
                    }
                })
            }else if(req.query.price && !req.query.search){
                products = await db.Product.findAll({
                    include : ['images','productStates',"category"],
                    where : {
                         price : { [Op.lte] : req.query.price } 
                        },
                    order: [ ["price","ASC"] ],
                })
            }else if(req.query.price && req.query.search){
                products = await db.Product.findAll({
                    include : ['images','productStates',"category"],
                    where : {
                        [Op.or] : [
                            { name : { [Op.substring] : req.query.search }},
                            { description : { [Op.substring] : req.query.search }},
                        ],
                        [Op.and] : { price : { [Op.lte] : req.query.price } }
                    },
                    order: [ ["price","ASC"] ],
                })
            }else{
                products = await db.Product.findAll({
                    include : ['images','productStates',"category"]
                })
            }
            return res.status(200).json({
                meta: {
                    link: getUrl(req),
                    total: products.length
                },
                data: products
            })
        } catch (error) {
            console.log(error)
            throwError(res, error)
        }
    }
}