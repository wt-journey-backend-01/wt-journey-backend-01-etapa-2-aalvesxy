const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

// GET /agentes -> Lista todos os agentes (com filtros e ordenação)
router.get('/agentes', agentesController.getAllAgentes);

// GET /agentes/:id -> Retorna um agente específico
router.get('/agentes/:id', agentesController.getAgenteById);

// POST /agentes -> Cadastra um novo agente
router.post('/agentes', agentesController.createAgente);

// PUT /agentes/:id -> Atualiza os dados do agente por completo
router.put('/agentes/:id', agentesController.updateAgente);

// PATCH /agentes/:id -> Atualiza os dados do agente parcialmente
router.patch('/agentes/:id', agentesController.updateAgente);

// DELETE /agentes/:id -> Remove o agente
router.delete('/agentes/:id', agentesController.deleteAgente);

module.exports = router;