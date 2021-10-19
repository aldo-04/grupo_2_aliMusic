const {validationResult} = require('express-validator');
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs")

/* const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'),'utf-8'));
const saveUser = dato =>fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json'),JSON.stringify(users,null,2),'utf-8'); */
const db = require('../database/models')

module.exports = {
    profile: (req, res) => {
        let user = db.User.findByPk(req.session.userLogin.id)
        let products = db.Product.findAll({
            include: ['images','productStates'],
            where: {
                userId: req.session.userLogin.id
            }
        })
            Promise.all([user, products])
                .then(([user, products]) => {
                    res.render('users/user',{
                            title: req.session.userLogin.firstName,
                            user,
                            products
                        })
                })
            
        
    },
    login : (req,res) => res.render('users/login',{
        title: 'login'
    }),
    processLogin : (req,res) => {
        let errors = validationResult(req);
        /* console.log(req.body);
        console.log(errors) */
        if (errors.isEmpty()) {
            const{email, recordar} = req.body
            db.User.findOne({
                where: {
                    email
                }
            })
                .then(user => {
                    req.session.userLogin = {
                        id : user.id,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        avatar : user.avatar,
                        rol : user.rol
                    }
                    console.log(req.session.userLogin)
                    if (recordar) {
                        res.cookie("recordarme", req.session.userLogin, {maxAge:1000 * 60})
                    }
                    return res.redirect('/')
                })
                .catch(error => console.log(error))
            
        }else{
            return  res.render('users/login',{
                title:'Login',
                errores: errors.mapped()
            })
        }
        
    },
    register: (req, res) => {
        res.render('users/register',{
            title: 'register'
        })
    },
    proccesRegister:(req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){

        const{firstName,lastName,email,number,password}=req.body
        db.User.create({
            userName : 'sherlock',
            firstName : firstName.trim(),
            lastName : lastName.trim(),
            email: email.trim(),
            number: +number,
            password: bcrypt.hashSync(password.trim(),10),
            rol: 2,
            avatar: req.file ? req.file.filename : 'avatar_default.png',
        })
            .then(user => {
                req.session.userLogin = {
                    id: user.id,
                    firstName: user.firstName,
                    avatar: user.avatar,
                    rol: user.rol
                }
                return res.redirect('/')
            })
            .catch(error => console.log(error))
    }else{
        return res.render('user/register',{
            title : 'Register',
            errores : errors.mapped()
        })
    }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie("recordarme", null, {MaxAge: -1});
        res.redirect('/')
    },
    fav: (req, res) => {
        res.render('users/fav',{
            title: 'fav' 
        })
    },
    profileEdit: (req, res) => {
        const {firstName, lastName, number, email, password, newPassword, avatar} = req.body
        db.User.update(
            {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                number: number,
                email: email.trim(),
                password: newPassword.isEmpty() ? bcrypt.hashSync(password.trim(),10) : bcrypt.hashSync(newPassword.trim(),10),
                avatar: req.file ? req.file.filename : avatar
            },
            {
                where: {id: req.session.userLogin.id}
            }
        )   .then(() => res.redirect('/user/profile')).catch(error => console.log(error))
    }
}