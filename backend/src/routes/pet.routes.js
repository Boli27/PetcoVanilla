const {Router}=require('express');
const {createPet, ConsultarPet}=require('../controllers/pet.controller');
const { route } = require('../config/app');


const router = Router();

router.post('/register',createPet);
router.get('/consultar',ConsultarPet);

module.exports = router;