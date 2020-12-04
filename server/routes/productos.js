const express = require('express');
const Productos = require('../models/productos')
const app = express()
const _ = require('underscore')


app.get('/productos', function(req, res){

    let desde = req.query.desde || 0
    let hasta = req.query.hasta || 5

    Productos.find({Disponibilidad: true})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre email')
    .exec((err, productos)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Ocurrio un error al regresar la lista',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Lista de prouctos',
            conteo: productos.length,
            productos
        })
    })
})


app.post('/productos', (req, res)=>{

    let prod = new Productos({
        Nombre: req.body.Nombre,
        PrecioUni: req.body.PrecioUni,
        Categoria: req.body.Categoria,
        Usuario: req.body.Usuario

    })
    prod.save((err, proBD)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Oscurrio un problema al insertar un producto',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            proBD
        })
    })
    
})

app.put('/productos/:id', (req, res)=>{
    let id = req.params.id
    let body = _.pick(req.body, ['Nombre', 'PrecioUni', 'Categoria', 'Usuario'])

    Productos.findByIdAndUpdate(id, body, 
        {new:true, runValidators:true, context:'query'},(err,proBD)=>{
            if (err){
                return res.status(400).json({
                    ok:false,
                    msg: 'Sucedio un erro a la hora de actualizar el producto',
                    err
                })
            }

        res.json({
            ok: true,
            msg: 'Se actualizo con exito',
            proBD
        })
    })
})


app.delete('/productos/:id', (req, res)=>{
    let id = req.params.id

//     Productos.findOneAndRemove(id, {context:'query'}, (err, proBD)=>{
//         if(err){
//             return res.status(400).json({
//                 ok:false,
//                 msg: 'Ocuarrio un error... Cual es? quien sabe',
//                 err
//             })
//         }
//         res.json({
//             ok: true,
//             msg: 'Si se elimino',
//             proBD
//         })
//     })

Productos.findByIdAndUpdate(id,{Disponibilidad: false},
    { new: true , runValidators: true, context: 'query'}, (err ,proBD) =>{
        if(err){
            return res.status(400).json({
            ok: false,
            msg: 'Algo hiciste mal...tas tonto o que',
            err
            })
        }
        res.json({
            ok: true,
            msg: 'Usuario eliminao con exito',
            proBD
            })
    })
})


module.exports = app