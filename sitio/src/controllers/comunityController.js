const fs = require('fs');
const path = require('path');
/* const posts = require('../data/comunity'); */
const db = require('../database/models')

module.exports = {
    comunity: (req, res) => {
        db.Post.findAll({
            order : ['updatedAt','DESC'],
            include : ['types']
        })
        .then(posts => {
            res.render('comunity/comunity',{
                title: 'Comunity',
                posts
            })
        })
        
    },
    add: (req, res) => {
        
    }
}