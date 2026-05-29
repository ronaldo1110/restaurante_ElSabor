import { Producto, Categoria, Venta, Cliente, DashboardStats } from '../types';

export const productos: Producto[] = [
  {
    id_producto: 1,
    codigo: "001",
    nombre: "Seco de Pollo Ecuatoriano",
    categoria: "Comida Ecuatoriana",
    precio: 12.00,
    stock: 30,
    popularidad: "muy popular",
    imagen_id: "64f1bcb9a1234abcd5670001",
    creado_en: "2025-06-02T09:43:05.733Z"
  },
  {
    id_producto: 2,
    codigo: "002",
    nombre: "Encebollado",
    categoria: "Comida Ecuatoriana",
    precio: 15.99,
    stock: 24,
    popularidad: "popular",
    imagen_id: "64f1bcb9a1234abcd5670002",
    creado_en: "2025-06-02T09:44:48.273Z"
  },
  {
    id_producto: 3,
    codigo: "003",
    nombre: "Parrillada Campestre",
    categoria: "Comida Ecuatoriana",
    precio: 25.99,
    stock: 10,
    popularidad: "muy popular",
    imagen_id: "64f1bcb9a1234abcd5670003",
    creado_en: "2025-06-02T14:27:55.054Z"
  },
  {
    id_producto: 4,
    codigo: "004",
    nombre: "Papipollo",
    categoria: "Complementos y servicios",
    precio: 3.00,
    stock: 29,
    popularidad: "poco conocido",
    imagen_id: "64f1bcb9a1234abcd5670004",
    creado_en: "2025-06-02T14:28:52.005Z"
  },
  {
    id_producto: 5,
    codigo: "005",
    nombre: "Tarta de Maracuyá",
    categoria: "Postres",
    precio: 8.99,
    stock: 20,
    popularidad: "con potencial",
    imagen_id: "64f1bcb9a1234abcd5670005",
    creado_en: "2025-06-02T14:30:49.470Z"
  },
  {
    id_producto: 6,
    codigo: "006",
    nombre: "Tacos al Pastor",
    categoria: "Comida Internacional",
    precio: 12.99,
    stock: 37,
    popularidad: "popular",
    imagen_id: "64f1bcb9a1234abcd5670006",
    creado_en: "2025-06-02T14:31:47.690Z"
  }
];

export const categorias: Categoria[] = [
  { id_categoria: 1, nombre: "Comida Ecuatoriana", descripcion: "Platos tradicionales del Ecuador" },
  { id_categoria: 2, nombre: "Postres", descripcion: "Dulces, tortas y otras delicias" },
  { id_categoria: 3, nombre: "Comida Internacional", descripcion: "Comida del resto del mundo" },
  { id_categoria: 4, nombre: "Complementos y servicios", descripcion: "Extras como bebidas o atención especial" }
];

export const ventas: Venta[] = [
  {
    id_venta: 1,
    id_cliente: 1,
    id_carrito: 1,
    fecha: "2025-06-02T14:35:00.000Z",
    subtotal: 32.31,
    impuestos: 4.32,
    total: 36.63,
    detalles: [
      {
        id_producto: 1,
        cantidad: 1,
        precio_unitario: 12.00,
        impuesto: 1.92,
        subtotal: 13.92
      },
      {
        id_producto: 2,
        cantidad: 2,
        precio_unitario: 15.99,
        impuesto: 2.40,
        subtotal: 18.39
      }
    ]
  },
  {
    id_venta: 2,
    id_cliente: 2,
    id_carrito: 2,
    fecha: "2025-06-03T10:10:00.000Z",
    subtotal: 25.99,
    impuestos: 3.90,
    total: 29.89,
    detalles: [
      {
        id_producto: 3,
        cantidad: 1,
        precio_unitario: 25.99,
        impuesto: 3.90,
        subtotal: 29.89
      }
    ]
  }
];

export const clientes: Cliente[] = [
  {
    id_cliente: 1,
    nombre: "Leonidas",
    apellido: "Inca",
    cedula: "23367953344",
    direccion: "Machala",
    id_usuario: 1,
    carritos: [
      {
        id_carrito: 1,
        fecha: "2025-06-02T14:34:15.701Z",
        estado: "entregado",
        productos: [
          {
            id_producto: 1,
            cantidad: 1,
            precio_unitario: 12.00,
            impuesto: 1.92,
            subtotal: 13.92
          },
          {
            id_producto: 2,
            cantidad: 2,
            precio_unitario: 15.99,
            impuesto: 2.40,
            subtotal: 18.39
          }
        ]
      }
    ],
    usuario: {
      id_usuario: 1,
      email: "leonidas@gmail.com",
      password: "<hash_bcrypt1>",
      rol: "cliente"
    }
  },
  {
    id_cliente: 2,
    nombre: "Ana",
    apellido: "Arias",
    cedula: "3943439291",
    direccion: "Santa Rosa",
    id_usuario: 2,
    carritos: [
      {
        id_carrito: 2,
        fecha: "2025-06-03T10:05:00.000Z",
        estado: "enviado",
        productos: [
          {
            id_producto: 3,
            cantidad: 1,
            precio_unitario: 25.99,
            impuesto: 3.90,
            subtotal: 29.89
          }
        ]
      },
      {
        id_carrito: 3,
        fecha: "2025-06-05T12:22:00.000Z",
        estado: "en_preparacion",
        productos: [
          {
            id_producto: 5,
            cantidad: 2,
            precio_unitario: 8.99,
            impuesto: 1.35,
            subtotal: 10.34
          }
        ]
      }
    ],
    usuario: {
      id_usuario: 2,
      email: "ana.arias@gmail.com",
      password: "<hash_bcrypt2>",
      rol: "cliente"
    }
  },
  {
    id_cliente: 3,
    nombre: "Jeremy",
    apellido: "Torres",
    cedula: "0706238491",
    direccion: "Guabo",
    id_usuario: 3,
    carritos: [],
    usuario: {
      id_usuario: 3,
      email: "jeremy@gmail.com",
      password: "<hash_bcrypt3>",
      rol: "admin"
    }
  }
];

export const dashboardStats: DashboardStats = {
  totalVentas: 66.52,
  ventasHoy: 29.89,
  clientesTotal: 3,
  productosTotal: 6,
  ventasPorMes: [
    { mes: 'Ene', ventas: 45.20 },
    { mes: 'Feb', ventas: 52.10 },
    { mes: 'Mar', ventas: 38.90 },
    { mes: 'Abr', ventas: 61.30 },
    { mes: 'May', ventas: 49.80 },
    { mes: 'Jun', ventas: 66.52 }
  ],
  productosPopulares: [
    { nombre: 'Seco de Pollo', ventas: 12 },
    { nombre: 'Parrillada', ventas: 8 },
    { nombre: 'Encebollado', ventas: 6 },
    { nombre: 'Tacos al Pastor', ventas: 4 }
  ]
};