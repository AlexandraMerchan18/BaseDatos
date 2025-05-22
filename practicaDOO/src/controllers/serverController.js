const person = require('../models/person');

class ServerController {
    constructor() {

    }

    //Obtiene todos los registros de la colección de la base de datos NoSQL
    async getAllUsers(req, res) {
        try {
            const data = await person.find({}); // El objeto vacío {} indica que queremos todos los documentos
            res.status(200).json(data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            res.status(500).send();
        }
    }
    //Obtiene el registro según el id que le estemos pasando a la colección de la base de datos NoSQL
    async getUsers(req, res) {
        try {
            const id = req.params.id;
            const data = await person.findById(id);

            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).send(); // Si no se encuentra el usuario, devolvemos un 404
            }
        } catch (error) {
            console.error(`Error al obtener el usuario con ID ${req.params.id}:`, error);
            res.status(500).send();
        }
    }

}

exports.default = ServerController;


