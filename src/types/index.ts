export interface Producto {  
    _id?: string; //
    id_producto: number;
    codigo: string;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
    popularidad: string;
    imagen_id: string;
    creado_en: string;
  }
  
  
  export interface Categoria {
    id_categoria: number;
    nombre: string;
    descripcion: string;
  }
  
  export interface DetalleVenta {
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
    impuesto: number;
    subtotal: number;
  }
  
  export interface Venta {
    id_venta: number;
    id_cliente: number;
    id_carrito: number;
    fecha: string;
    subtotal: number;
    impuestos: number;
    total: number;
    detalles: DetalleVenta[];
  }
  
  export interface ProductoCarrito {
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
    impuesto: number;
    subtotal: number;
  }
  
  export interface Carrito {
    id_carrito: number;
    fecha: string;
    estado: 'pendiente' | 'confirmado' | 'en_preparacion' | 'enviado' | 'entregado' | 'cancelado';
    productos: ProductoCarrito[];
  }
  
  export interface Usuario {
    id_usuario: number;
    email: string;
    password: string;
    rol: 'admin' | 'cliente';
  }
  
  export interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido: string;
    cedula: string;
    direccion: string;
    id_usuario: number;
    carritos: Carrito[];
    usuario: Usuario;
  }
  
  export interface DashboardStats {
    totalVentas: number;
    ventasHoy: number;
    clientesTotal: number;
    productosTotal: number;
    ventasPorMes: { mes: string; ventas: number }[];
    productosPopulares: { nombre: string; ventas: number }[];
  }