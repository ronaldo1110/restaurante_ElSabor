// models/clientes_embebido.js
import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    id_producto: Number,
    cantidad: Number,
    precio_unitario: Number,
    impuesto: Number,
    subtotal: Number
}, { _id: false });

const carritoSchema = new mongoose.Schema({
    id_carrito: Number,
    fecha: Date,
    estado: String,
    productos: [productoSchema]
}, { _id: false });

const usuarioSchema = new mongoose.Schema({
    id_usuario: Number,
    email: String,
    password: String,
    rol: String
}, { _id: false });

const clienteSchema = new mongoose.Schema({
    id_cliente: Number,
    nombre: String,
    apellido: String,
    cedula: String,
    direccion: String,
    id_usuario: Number,
    carritos: [carritoSchema],
    usuario: usuarioSchema
});

export default mongoose.model('Cliente', clienteSchema, 'clientes_embebido');