const fs = require("fs");
const path = require("path");

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'),'utf-8'));

const saveUser = dato =>fs.writeFileSync(path.join(__dirname, '..', 'data', 'users.json'),JSON.stringify(products,null,2),'utf-8');

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
    proccesRegister:(req,res)=>{
        const{nombre,apellido,email,celular,password,passworConfirm}=req.body

        userRegister={
            id: users[users.length -1] ? users[users.length -1].id +1 : 1,
            nombre : nombre.trim(),
            apellido : apellido.trim(),
            email: email.trim(),
            celular,
            password,
            passworConfirm,
            rol: "user"
            
        }
        return res.send(userRegister)
        users.push(userRegister);
        saveUser(users);
        res.redirect("/");
    },

    fav: (req, res) => {
        res.render('users/fav',{
            title: 'fav' 
        })
    }
}