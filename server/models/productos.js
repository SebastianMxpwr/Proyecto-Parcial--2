const mongoose =  require('mongoose');
const Schema = mongoose.Schema

let productosSchema = new Schema({

    Nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    PrecioUni:{
        type: Number,
        required: [true, 'El precio es obligatoria']
    },
    Categoria:{
        type: Schema.Types.ObjectId,
        required: [true, 'La categoria es obligatoria'],
        ref: 'Categoria'
        
    },
    Disponibilidad:{
        type: Boolean,
        default: true
    },
    Usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'

    },
});

module.exports = mongoose.model('Productos', productosSchema);

