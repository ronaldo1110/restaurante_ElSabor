import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
    productos: [{
        productoId: mongoose.Schema.Types.ObjectId,
        cantidad: Number,
    }, ],
    total: Number,
    clienteId: {
        type: String,
        required: true, // puedes usar ObjectId si tienes colección Cliente
    },
});

export default mongoose.model('Carrito', carritoSchema);