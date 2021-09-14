module.exports = (req,res,next) => {
    if(req.session.userLogin && req.session.userLogin.rol === "user"){
        res.redirect('/')
    }else{
        next()
    }
}