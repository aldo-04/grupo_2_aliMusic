module.exports = {
    index: (req, res) => {
        return res.render('index/index', {
            title: 'Ali Music',
        });
    },
    contact: (req, res) => {
        return res.render('index/contact',{
            title: 'Contact'
        })
    },
    
}