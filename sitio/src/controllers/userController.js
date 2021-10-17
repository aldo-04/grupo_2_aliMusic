const {validationResult} = require('express-validator');
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs")

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'),'utf-8'));
const saveUser = dato =>fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json'),JSON.stringify(users,null,2),'utf-8');

module.exports = {
    profile: (req, res) => {
        users.find(user =>{
            if (user.id === res.locals.userLogin.id) {
                res.render('users/user',{
                    title: 'user',
                    user
                })
            }
        })
        
    },
    login : (req,res) => res.render('users/login',{
        title: 'login'
    }),
    processLogin : (req,res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            let user = users.find(user => user.email === req.body.email.trim());

            req.session.userLogin = {
                id : user.id,
                name : user.name,
                lastName : user.lastName,
                avatar : user.avatar,
                rol : user.rol
            }

            if(req.body.recordar){
                res.cookie("recordarme", req.session.userLogin, {maxAge:1000 * 60})
            }
            res.redirect('/')
        }else{
            return res.render('users/login',{
                title: "login",
                errors : errors.mapped()
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

        const{name,lastName,email,numero,password}=req.body

        userRegister={
            id: users[users.length -1] ? users[users.length -1].id +1 : 1,
            name : name.trim(),
            lastName : lastName.trim(),
            email: email.trim(),
            number: +numero,
            password: bcrypt.hashSync(password.trim(),10),
            rol: name.trim() === 'aldo' || name.trim() === 'marian' ? "admin": "user",
            avatar: req.file ? req.file.filename : 'avatar_default.png',
        }
        users.push(userRegister);
        saveUser(users);
        res.redirect("/users/login");
    }else{
        return  res.render('users/register',{
            title: "Register",
            old : req.body,
            errors : errors.mapped()
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