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
// Crear usuario
    async createUser(req, res) {
        try {
            const newUser = new person(req.body);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            console.error("Error al crear usuario:", error);
            res.status(500).send();
        }
    }
    // Actualizar usuario por ID
    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const updatedUser = await person.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).send();
            }
        } catch (error) {
            console.error(`Error al actualizar usuario con ID ${req.params.id}:`, error);
            res.status(500).send();
        }
    }
     // Eliminar usuario por ID
    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const deletedUser = await person.findByIdAndDelete(id);
            if (deletedUser) {
                res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
            } else {
                res.status(404).send();
            }
        } catch (error) {
            console.error(`Error al eliminar usuario con ID ${req.params.id}:`, error);
            res.status(500).send();
        }
    }
}

exports.default = ServerController;


