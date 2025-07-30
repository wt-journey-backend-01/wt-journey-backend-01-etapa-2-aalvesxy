const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

// GET /casos -> Lista todos os casos (com filtros e busca)
router.get('/casos', casosController.getAllCasos);

// GET /casos/search?q=... -> Pesquisa casos (implementado no getAllCasos)

// GET /casos/:id -> Retorna um caso específico
router.get('/casos/:id', casosController.getCasoById);

// GET /casos/:caso_id/agente -> Retorna o agente do caso
router.get('/casos/:caso_id/agente', casosController.getAgenteByCasoId);

// POST /casos -> Cria um novo caso
router.post('/casos', casosController.createCaso);

// PUT /casos/:id -> Atualiza um caso por completo
router.put('/casos/:id', casosController.updateCaso);

// PATCH /casos/:id -> Atualiza um caso parcialmente
router.patch('/casos/:id', casosController.updateCaso);

// DELETE /casos/:id -> Remove um caso
router.delete('/casos/:id', casosController.deleteCaso);

module.exports = router;