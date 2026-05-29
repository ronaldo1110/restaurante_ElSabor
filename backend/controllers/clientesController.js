// controllers/clientesController.js
import Cliente from '../models/clientes_embebido.js';

// ✅ Crear cliente
export const crearCliente = async(req, res) => {
    try {
        const ultimoCliente = await Cliente.findOne().sort({ id_cliente: -1 });
        const nuevoIdCliente = ultimoCliente ? ultimoCliente.id_cliente + 1 : 1;
        const nuevoIdUsuario = nuevoIdCliente; // Asignación directa

        const nuevoCliente = new Cliente({
            id_cliente: nuevoIdCliente,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            cedula: req.body.cedula,
            direccion: req.body.direccion,
            id_usuario: nuevoIdUsuario,
            usuario: {
                id_usuario: nuevoIdUsuario,
                email: req.body.email,
                password: req.body.password, // Asegúrate de hashearlo si es necesario
                rol: req.body.rol || 'cliente'
            },
            carritos: []
        });

        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ mensaje: 'Error al crear cliente' });
    }
};

// ✅ Obtener todos los clientes
export const obtenerClientes = async(req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ mensaje: 'Error al obtener clientes' });
    }
};

// ✅ Actualizar cliente
export const actualizarCliente = async(req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findOne({ id_cliente: parseInt(id) });
        if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });

        cliente.nombre = req.body.nombre;
        cliente.apellido = req.body.apellido;
        cliente.cedula = req.body.cedula;
        cliente.direccion = req.body.direccion;

        if (cliente.usuario) {
            cliente.usuario.email = req.body.email;
            cliente.usuario.password = req.body.password; // Hashea si es necesario
            cliente.usuario.rol = req.body.rol || cliente.usuario.rol;
        }

        await cliente.save();
        res.json(cliente);
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ mensaje: 'Error al actualizar cliente' });
    }
};

// ✅ Eliminar cliente
export const eliminarCliente = async(req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findOneAndDelete({ id_cliente: parseInt(id) });
        if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).json({ mensaje: 'Error al eliminar cliente' });
    }
};