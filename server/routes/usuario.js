const express = require('express');
const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario');
const app = express();
const _ = require('underscore')



app.get('/usuario', function(req, res){
    let desde = req.query.desde || 0
    let hasta = req.query.hasta || 5

    Usuario.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Oscurrio un error al consultar',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Esta es la lista de usuarios',
            conteo: usuarios.length,
            usuarios 
        })
    })
})

app.post('/usuario', function(req, res){
    let body = req.body;
    let usr = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    usr.save((err, usrDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Sucedio un error al insertar',
                err 
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario Insertado con exito', 
            usrDB
        });
    });
});

//actualizar usuario
app.put('/usuario/:id', function(req, res){
    let id = req.params.id
    let body = _.pick(req.body, ['nombre','email'])

    Usuario.findByIdAndUpdate(id,body,
         {new: true, runValidators: true, context: 'query'},
         (err, usrDB)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    msg: 'Algo hiciste mal...Pus que estas poniendo',
                    err
                })
            }

            res.json({
                ok: true,
                msg: 'usario actualizado con exito',
                usuario: usrDB
            })
    })
    
    
})

app.delete('/usuario/:id', function(req, res){
//    let id = req.params.id

//    Usuario.deleteOne({ _id: id }, (err, usuarioBorrado)=> {
//      if(err){
//          return res.status(400).json({
//              ok: false,
//              msg: 'Algo hiciste mal...Pinche pendejo',
//              err
//          })
//      }

//      res.json({
//          ok: true,
//          msg: 'Usuario eliminao con exito',
//          usuarioBorrado
//      })
//    }) 

let id = req.params.id

Usuario.findByIdAndUpdate(id,{estado: false},
    { new: true , runValidators: true, context: 'query'}, (err ,usrDB) =>{
        if(err){
            return res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error inesperado al momento de eliminar',
            err
            })
        }
        res.json({
            ok: true,
            msg: 'Usuario eliminao con exito',
            usrDB
            })
    })
})
module.exports = app;