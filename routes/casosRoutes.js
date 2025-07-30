const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

router.get('/casos', casosController.getAllCasos);

router.get('/casos/search', casosController.getAllCasos);

router.get('/casos/:id', casosController.getCasoById);

router.get('/casos/:caso_id/agente', casosController.getAgenteByCasoId);

router.post('/casos', casosController.createCaso);

router.put('/casos/:id', casosController.updateCaso);

router.patch('/casos/:id', casosController.updateCaso);

router.delete('/casos/:id', casosController.deleteCaso);

module.exports = router;