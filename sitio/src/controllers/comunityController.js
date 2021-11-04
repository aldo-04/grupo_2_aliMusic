const fs = require('fs');
const path = require('path');
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'comunity.json'), 'utf-8'));
const db = require('../database/models')
const youtubeLink = require('../utils/convertirLinkYt');

module.exports = {
    comunity: (req, res) => {
        return res.render('comunity/comunity',{
            title: 'Comunidad',
            posts
        })
        
    },
    add: (req, res) => {
        const {name, description, media } = req.body
        const newPost = {
            autor: 'Lucas Diaz Mouhsen',
            name,
            description,
            media: 'https://www.youtube.com/embed/'+ youtubeLink(media),
            type: 'iframe',
            image: 1
        }
        posts.push(newPost)
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'comunity.json'), JSON.stringify(posts, null, 2), 'utf-8')
        return res.redirect('/comunity')
    }
}