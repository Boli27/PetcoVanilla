const database = require("../config/database");


const createPet = (req, res) => {

    const { nombre, especie, raza, edad} = req.body;

    const insertQuery = `INSERT INTO mascota (nombre, especie, raza, edad) VALUES ( ?, ?, ?, ?)`;
    const query = database.format(insertQuery, [nombre, especie, raza, edad]);

    database.query(query, (err, result) => {
        if (err) {
            return res.status(500).send({ message: "Error al agregar mascota" });
        }
        res.send({ message: 'Mascota agregada con éxito' });
    });
};


module.exports = {
    createPet,
};