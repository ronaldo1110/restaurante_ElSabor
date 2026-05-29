import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productosRoutes from './routes/productosRoutes.js'; // 👈 asegúrate de poner .js al final
import clientesRoutes from './routes/clientesRoutes.js';
import carritoRoutes from './routes/carritoRoutes.js';

// Correcto, con el punto en el nombre del archivo
import authRoutes from './routes/auth.routes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/productos', productosRoutes);
// Esto en tu archivo principal (server.js o index.js)
app.use('/uploads', express.static('uploads'));
app.use('/api/clientes', clientesRoutes);

app.use('/api/auth', authRoutes); // Así accederás como /api/auth/register


app.use('/api/carrito', carritoRoutes); // <--- AGREGA ESTO

mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('🟢 Conectado a MongoDB');
        app.listen(3001, () => console.log('🚀 Servidor en http://localhost:3001'));
    })
    .catch((error) => console.error('❌ Error de conexión:', error));