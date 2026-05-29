// routes/clientesRoutes.js
import express from 'express';
import {
    crearCliente,
    obtenerClientes,
    actualizarCliente,
    eliminarCliente
} from '../controllers/clientesController.js';

const router = express.Router();

router.get('/', obtenerClientes);
router.post('/', crearCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);

export default router;