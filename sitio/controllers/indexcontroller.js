module.exports = {
    index: (req, res) => {
        return res.render('index/index', {
            title: 'Ali Music',
        });
    },
    about: (req, res) => {
        return res.render('index/about',{
            title: 'about',
        })
    },
    
}