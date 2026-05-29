import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    id_producto: Number,
    codigo: String,
    nombre: String,
    categoria: String,
    precio: Number,
    stock: Number,
    popularidad: String,
    imagen_id: String,
    creado_en: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'menu' });

export default mongoose.model('Producto', productoSchema); // <-- nombre real de colección