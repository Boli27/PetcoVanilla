const {Router}=require('express');
const {createPet}=require('../controllers/pet.controller');
const { route } = require('../config/app');


const router = Router();

router.post('/register',createPet);

module.exports = router;