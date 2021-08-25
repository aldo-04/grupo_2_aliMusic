const fs = require('fs');
const path = require('path');
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'comunity.json'),'utf-8'));

module.exports = {
    comunity: (req, res) => {
        res.render('comunity/comunity',{
            title: 'Comunity',
            posts
        })
    }
}