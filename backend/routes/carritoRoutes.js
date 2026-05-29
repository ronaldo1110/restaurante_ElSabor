import express from 'express';
import { guardarCarrito } from '../controllers/carritoController.js';

const router = express.Router();

router.post('/', guardarCarrito);

export default router;