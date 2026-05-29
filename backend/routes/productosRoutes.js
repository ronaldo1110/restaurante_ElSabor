import express from 'express';
import multer from 'multer';
import {
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto,
} from '../controllers/productosController.js';

const router = express.Router();

// Configuración de multer
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Rutas

router.get('/', obtenerProductos);
router.post('/', upload.single('imagen'), crearProducto);
router.put('/:id', upload.single('imagen'), actualizarProducto); // ✅ CORREGIDO
router.delete('/:id', eliminarProducto);

export default router;