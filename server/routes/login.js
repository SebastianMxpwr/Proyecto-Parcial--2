const express = require('express')
const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res)=>{
    let body = req.body

    Usuario.findOne({ email: body.email, estado: true }, (err, usrDB)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al loguearte',
                err
            })
        }
        if(!usrDB){
            return res.status(400).json({
                ok: false,
                msg: 'Mail incorrecto o inexistente Intentelo de nuevo'
            })
        }
        if(!bcrypt.compareSync(body.password, usrDB.password)){
            return res.status(401).json({
                ok: false,
                msg: 'Contraseña incorrecta, intentelo de nuevo'
            })
        }
        res.json({
            ok: true,
            msg: `Bienvenido ${usrDB.nombre}`,
            usrDB
        })
    })
})

module.exports = app; 