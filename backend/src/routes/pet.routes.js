const {Router}=require('express');
const {createPet, ConsultarPet, EliminarMascota}=require('../controllers/pet.controller');
const { route } = require('../config/app');


const router = Router();

router.post('/register',createPet);
router.get('/consultar',ConsultarPet);
router.delete('/eliminar/:idMascota',EliminarMascota);

module.exports = router;