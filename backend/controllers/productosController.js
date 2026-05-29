import Producto from '../models/Producto.js';
import fs from 'fs';
import path from 'path';

// Crear nuevo producto
export const crearProducto = async(req, res) => {
    try {
        const ultimoProducto = await Producto.findOne().sort({ id_producto: -1 });
        const nuevoId = ultimoProducto ? ultimoProducto.id_producto + 1 : 1;
        const nuevoCodigo = nuevoId.toString().padStart(3, '0');

        const nuevoProducto = new Producto({
            id_producto: nuevoId,
            codigo: nuevoCodigo,
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            precio: req.body.precio,
            stock: req.body.stock,
            popularidad: req.body.popularidad,
            imagen_id: req.file && req.file.filename ? req.file.filename : '', // guarda la imagen si existe
            creado_en: new Date(),
        });

        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ mensaje: 'Error al crear el producto' });
    }
};

// Obtener todos los productos
export const obtenerProductos = async(req, res) => {
    try {
        const productos = await Producto.find().sort({ id_producto: 1 });
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los productos' });
    }
};

// Actualizar producto existente
export const actualizarProducto = async(req, res) => {
    try {
        const { id } = req.params;

        const productoExistente = await Producto.findById(id);
        if (!productoExistente) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }


        // Reemplazar imagen si se sube una nueva
        let imagenActual = productoExistente.imagen_id;
        if (req.file) {
            if (imagenActual) {
                const rutaAnterior = path.join('uploads', imagenActual);
                if (fs.existsSync(rutaAnterior)) {
                    fs.unlinkSync(rutaAnterior);
                }
            }
            imagenActual = req.file.filename;
        }

        const productoActualizado = await Producto.findByIdAndUpdate(id, {
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            precio: req.body.precio,
            stock: req.body.stock,
            popularidad: req.body.popularidad,
            imagen_id: imagenActual,
        }, { new: true });

        res.json(productoActualizado);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el producto' });
    }
};
export const eliminarProducto = async(req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByIdAndDelete(id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        // Eliminar imagen asociada si existe
        if (producto.imagen_id) {
            const rutaImagen = path.join('uploads', producto.imagen_id);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
        }

        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el producto' });
    }
};