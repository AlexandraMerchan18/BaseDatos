//Importar express
const express = require('express');
const serverRouter = require('./routers/serverRouter');
//Importar mongoose
const mongoose = require('mongoose');
//Importar url de conexión a la BD
const database = require('./database/db');
//Importar cors
const cors = require('cors');

class Server {
    constructor() {
        this.conectarBD();
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);
        //Indicar que las solicitudes http se trabajará en JSON
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor corriendo por el puerto => ", this.app.get('port'));
        });

        const router = express.Router();
        router.get('/', (req, res) => {
            console.log("Nueva conexión");
            res.status(200).json({ message: "Diseño Orientado a Objetos" });
        });

        const serverR = new serverRouter.default();

        this.app.use(serverR.router);
        this.app.use(router);
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