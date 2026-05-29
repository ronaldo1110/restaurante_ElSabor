// backend/routes/auth.routes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Cliente from '../models/clientes_embebido.js';

const router = express.Router();

// REGISTRO
router.post('/register', async(req, res) => {
    const { email, password, nombre, apellido, cedula, direccion } = req.body;

    try {
        // Validar formato de cédula: solo números y 10 dígitos
        const cedulaRegex = /^\d{10}$/;
        if (!cedulaRegex.test(cedula)) {
            return res.status(400).json({ message: 'La cédula debe contener exactamente 10 dígitos numéricos.' });
        }

        // Verificar si ya existe el email
        const existingEmail = await Cliente.findOne({ 'usuario.email': email });
        if (existingEmail) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

        // Verificar si ya existe la cédula
        const existingCedula = await Cliente.findOne({ cedula: cedula });
        if (existingCedula) {
            return res.status(400).json({ message: 'La cédula ya está registrada.' });
        }

        // Obtener ID incremental
        const ultimoCliente = await Cliente.findOne().sort({ id_cliente: -1 });
        const nuevoIdCliente = ultimoCliente ? ultimoCliente.id_cliente + 1 : 1;
        const nuevoIdUsuario = ultimoCliente ? ultimoCliente.id_usuario + 1 : 1;

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoCliente = new Cliente({
            id_cliente: nuevoIdCliente,
            nombre,
            apellido,
            cedula,
            direccion,
            id_usuario: nuevoIdUsuario,
            carritos: [],
            usuario: {
                id_usuario: nuevoIdUsuario,
                email,
                password: hashedPassword,
                rol: 'cliente'
            }
        });

        const clienteGuardado = await nuevoCliente.save();

        const token = jwt.sign({ id: clienteGuardado._id, rol: clienteGuardado.usuario.rol },
            'secreto', { expiresIn: '1h' }
        );

        return res.status(201).json({
            token,
            usuario: {
                id_usuario: clienteGuardado.id_usuario,
                email: clienteGuardado.usuario.email,
                rol: clienteGuardado.usuario.rol,
                nombre: clienteGuardado.nombre,
                apellido: clienteGuardado.apellido
            }
        });
    } catch (err) {
        console.error('Error en registro:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

// LOGIN
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const cliente = await Cliente.findOne({ 'usuario.email': email });

        if (!cliente) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(password, cliente.usuario.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: cliente._id, rol: cliente.usuario.rol },
            'secreto', { expiresIn: '1h' }
        );

        return res.json({
            token,
            usuario: {
                id_usuario: cliente.id_usuario,
                email: cliente.usuario.email,
                rol: cliente.usuario.rol,
                nombre: cliente.nombre,
                apellido: cliente.apellido
            }
        });
    } catch (err) {
        console.error('Error en login:', err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

export default router;