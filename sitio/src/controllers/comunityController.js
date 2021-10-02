const fs = require('fs');
const path = require('path');
const posts = require('../data/comunity');

module.exports = {
    comunity: (req, res) => {
        res.render('comunity/comunity',{
            title: 'Comunity',
            posts
        })
    }
}