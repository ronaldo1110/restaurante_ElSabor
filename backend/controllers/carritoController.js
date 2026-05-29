import Cliente from '../models/clientes_embebido.js';

let idCarritoCounter = 100; // Usa una estrategia mejor en producción

export const guardarCarrito = async(req, res) => {
    try {
        const { id_cliente, productos } = req.body;

        const fecha = new Date();
        const estado = 'confirmado';

        const calculos = productos.map(p => {
            const impuesto = +(p.precio_unitario * 0.16).toFixed(2);
            const subtotal = +(p.precio_unitario * p.cantidad + impuesto).toFixed(2);
            return {...p, impuesto, subtotal };
        });

        const subtotal = calculos.reduce((acc, p) => acc + p.subtotal, 0);
        const impuestos = calculos.reduce((acc, p) => acc + p.impuesto, 0);
        const total = +(subtotal + impuestos).toFixed(2);

        const nuevoCarrito = {
            id_carrito: idCarritoCounter++,
            fecha,
            estado,
            productos: calculos
        };

        // Buscar y actualizar cliente
        const cliente = await Cliente.findOne({ id_cliente });
        if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });

        cliente.carritos.push(nuevoCarrito);
        await cliente.save();

        return res.status(201).json({ mensaje: 'Carrito guardado', total });
    } catch (error) {
        console.error('❌ Error al guardar el carrito:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};