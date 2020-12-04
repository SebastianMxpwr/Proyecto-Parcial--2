const mongoose = require('mongoose')

let Schema = mongoose.Schema

let usarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true //es para hacer unico el dato
    },
    password:{
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    img:{
        type: String,
        required: false
    },
    role:{
        type: String,
        default: 'USER_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Usuario',usarioSchema)