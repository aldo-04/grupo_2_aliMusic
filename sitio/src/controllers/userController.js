module.exports = {
    user: (req, res) => {
        res.render('users/user',{
            title: 'user'
        })
    },
    login: (req, res) => {
        res.render('users/login',{
            title: 'login'
        })
    },
    register: (req, res) => {
        res.render('users/register',{
            title: 'register'
        })
    },
    fav: (req, res) => {
        res.render('users/fav',{
            title: 'fav' 
        })
    }
}