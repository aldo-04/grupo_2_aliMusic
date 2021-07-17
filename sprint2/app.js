const express = require("express")

const app = express()

const port = 3030

app.get('/',(req, res) => res.send('Este es el proyecto del grupo 2'))

app.listen(port,() => console.log("El servidor esta corriendo en http://localhost:"+ port))