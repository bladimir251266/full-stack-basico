const express = require('express'); // Importar Express
const bodyParser = require('body-parser'); // Importar body-parser para manejar JSON
const db = require('../db/db'); // Importar módulo de base de datos

const app = express(); // Crear una instancia de Express
const PORT = 3000; // Definir el puerto del servidor

app.use(bodyParser.json()); // Middleware para parsear JSON
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

// Ruta para obtener la lista de clientes
app.get('/clientes', (req, res) => {
    db.getClientes((err, clientes) => {
        if (err) return res.status(500).send(err); // Manejo de errores
        res.json(clientes); // Devolver la lista de clientes como JSON
    });
});

// Ruta para obtener un cliente específico por ID
app.get('/clientes/:id', (req, res) => {
    db.getClienteById(req.params.id, (err, cliente) => {
        if (err) return res.status(500).send(err); // Manejo de errores
        res.json(cliente); // Devolver el cliente como JSON
    });
});

// Ruta para agregar un nuevo cliente
app.post('/clientes', (req, res) => {
    db.addCliente(req.body, (err) => {
        if (err) return res.status(500).send(err); // Manejo de errores
        res.status(201).send('Cliente agregado'); // Devolver respuesta de éxito
    });
});

// Ruta para actualizar un cliente existente
app.put('/clientes/:id', (req, res) => {
    db.updateCliente(req.params.id, req.body, (err) => {
        if (err) return res.status(500).send(err); // Manejo de errores
        res.send('Cliente actualizado'); // Devolver respuesta de éxito
    });
});

// Ruta para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
    db.deleteCliente(req.params.id, (err) => {
        if (err) return res.status(500).send(err); // Manejo de errores
        res.send('Cliente eliminado'); // Devolver respuesta de éxito
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de inicio
});
