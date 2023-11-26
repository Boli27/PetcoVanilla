const database = require("../config/database");
const auth = require('../auth/index')

const createPet = (req, res) => {

    const {id_dueño, nombre, especie, raza, edad, id_plan} = req.body;

    const insertQuery = `INSERT INTO mascota (id_dueño, nombre, especie, raza, edad, id_plan) VALUES (?, ?, ?, ?, ?, ?)`;
    const query = database.format(insertQuery, [id_dueño, nombre, especie, raza, edad, id_plan]);

    database.query(query, (err, result) => {
        if (err) {
            return res.status(500).send({ message: "Error al agregar mascota" });
        }
        res.send({ message: 'Mascota agregada con éxito' });
    });
};

const ConsultarPet = (req, res) => {

    const token = req.headers.authorization.split(' ')[1]; // Extrae el token del encabezado

    const decoded = auth.verificarToken(token)

    if (decoded) {
        // El token es válido, podemos acceder a la información del usuario
        const userId = decoded.userId;
        // Realiza una consulta a la base de datos para obtener la información del usuario
        const query = "SELECT mascota.nombre, mascota.edad, mascota.raza, mascota.especie, planes.nombre_plan FROM mascota INNER JOIN planes on mascota.id_plan=planes.id WHERE id_dueño = ?;";
        database.query(query, [userId], (dbErr, result) => {
            if (dbErr) {
                return res.status(500).send({ message: "Error al buscar el usuario" });
            }

            const mascotas = result;

            res.status(200).json({ mascotas });
        });
    } else {
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = {
    createPet,
    ConsultarPet,
};