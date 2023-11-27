const database = require("../config/database");
const auth = require('../auth/index')

const createPet = (req, res) => {

    const {id_dueño, nombre, especie, raza, edad, id_plan} = req.body;

    const insertQuery = `INSERT INTO mascota (id_dueño, nombre, especie, raza, edad, id_plan) VALUES (?, ?, ?, ?, ?, ?)`;
    const query = database.format(insertQuery, [id_dueño, nombre, especie, raza, edad, id_plan]);

    database.query(query, (err, result) => {
        if (err) {
            return res.status(500).send({ message: `Error al agregar mascota ${err}` });
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
        const query = "SELECT mascota.id, mascota.nombre, mascota.edad, mascota.raza, mascota.especie, planes.nombre_plan FROM mascota INNER JOIN planes on mascota.id_plan=planes.id WHERE id_dueño = ?;";
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

const EliminarMascota = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extrae el token del encabezado
    const decoded = auth.verificarToken(token);

    if (decoded) {
        // El token es válido, puedes acceder a la información del usuario
        const userId = decoded.userId;
        const mascotaId = req.params.idMascota; // Obtén la ID de la mascota de la ruta

        // Realiza la eliminación de la mascota en la base de datos
        const query = "DELETE FROM mascota WHERE id = ? AND id_dueño = ?";
        database.query(query, [mascotaId, userId], (dbErr, result) => {
            if (dbErr) {
                console.error('Error en la consulta:', dbErr, userId, mascotaId);
                return res.status(500).send({ message: "Error al eliminar la mascota" });
            }
            console.log('UserID:', userId);
            console.log('MascotaID:', mascotaId);
            res.status(200).json({ message: `Mascota eliminada exitosamente`});
        });
    } else {
        res.status(401).json({ message: 'Token inválido' });
    }
};


module.exports = {
    createPet,
    ConsultarPet,
    EliminarMascota
};