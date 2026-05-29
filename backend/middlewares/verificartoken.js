// backend/middlewares/verificarToken.js
import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: 'Token requerido' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'secreto'); // Usa la misma clave que en auth.routes.js
        req.user = {
            id_cliente: decoded.id, // Lo usamos en los controladores de carrito
            rol: decoded.rol
        };
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

export default verificarToken;