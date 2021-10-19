const {validationResult} = require('express-validator');
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs")

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'),'utf-8'));
const saveUser = dato =>fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json'),JSON.stringify(users,null,2),'utf-8');
const db = require('../database/models')

module.exports = {
    profile: (req, res) => {
        db.User.findByPk(req.session.userLogin.id)
            .then(user => {
                res.send(user)
            })
        
    },
    login : (req,res) => res.render('users/login',{
        title: 'login'
    }),
    processLogin : (req,res) => {
        let errors = validationResult(req);
        
        console.log(errors)
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
                        fistName : user.firstName,
                        lastName : user.lastName,
                        avatar : user.avatar,
                        rol : user.rol
                    }
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

        const{firstName,lastName,email,numero,password}=req.body
        db.User.create({
            userName : 'sherlock',
            firstName : firstName.trim(),
            lastName : lastName.trim(),
            email: email.trim(),
            number: +numero,
            password: bcrypt.hashSync(password.trim(),10),
            rolId: firstName.trim() === 'aldo' || firstName.trim() === 'marian' ? 1: 1,
            avatar: req.file ? req.file.filename : 'avatar_default.png',
        })
            .then(user => {
                req.session.userLogin = {
                    id: user.id,
                    firstName: user.firstName,
                    avatar: user.avatar,
                    rolId: user.rolId
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
    }
}