// Importar express
const express = require('express');
const serverRouter = require('./routers/serverRouter');
// Importar mongoose
const mongoose = require('mongoose');
// Importar url de conexión a la BD
const database = require('./database/db');
// Importar cors
const cors = require('cors');
// Importar path para servir archivos estáticos
const path = require('path');
// Importar el router de personas
const personRouter = require('./routers/personRouter');

class Server {
    constructor() {
        this.conectarBD();
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);

        // Middleware
        this.app.use(express.json());
        this.app.use(cors());

        // Servir archivos estáticos (index.html y otros)
        this.app.use(express.static(path.join(__dirname, '../../')));

        // Rutas CRUD de personas
        this.app.use('/api', personRouter);

        // Otras rutas de la API
        const serverR = new serverRouter.default();
        this.app.use(serverR.router);

        // Ruta raíz de prueba
        const router = express.Router();
        router.get('/', (req, res) => {
            console.log("Nueva conexión");
            res.status(200).json({ message: "Diseño Orientado a Objetos" });
        });
        this.app.use(router);

        // Levantar el servidor
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor corriendo por el puerto => ", this.app.get('port'));
        });
    }

    conectarBD() {
        mongoose.connect(database.db).then(() => {
            console.log("Conexión a BD con éxito");
        }).catch((err) => {
            console.error("Error de conexión");
        });
    }
}

const objServer = new Server();