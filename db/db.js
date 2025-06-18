const mysql = require('mysql'); // Importar MySQL

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost', // Cambia esto si tu servidor MySQL está en otro lugar
    user: 'root', // Tu usuario de MySQL
    password: 'pope2874', // Tu contraseña de MySQL
    database: 'clientes_db' // Nombre de la base de datos creada
});

// Conectar a la base de datos
connection.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + connection.threadId);
});

// Exportar funciones para interactuar con la base de datos
module.exports = {
    getClientes: (callback) => {
        connection.query("SELECT * FROM clientes", callback); // Obtener todos los clientes
    },
    getClienteById: (id, callback) => {
        connection.query("SELECT * FROM clientes WHERE id = ?", [id], callback); // Obtener cliente por ID
    },
    addCliente: (cliente, callback) => {
        connection.query("INSERT INTO clientes (nombre, email) VALUES (?, ?)", [cliente.nombre, cliente.email], callback); // Agregar nuevo cliente
    },
    updateCliente: (id, cliente, callback) => {
        connection.query("UPDATE clientes SET nombre = ?, email = ? WHERE id = ?", [cliente.nombre, cliente.email, id], callback); // Actualizar cliente
    },
    deleteCliente: (id, callback) => {
        connection.query("DELETE FROM clientes WHERE id = ?", [id], callback); // Eliminar cliente
    }
};
