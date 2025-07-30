const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { sendErrorResponse } = require('../utils/errorHandler');

const getAllCasos = (req, res) => {
    const { agente_id, status, q } = req.query;
    const filtros = {};
    if (agente_id) filtros.agente_id = agente_id;
    if (status) filtros.status = status;
    if (q) filtros.q = q;

    const casos = casosRepository.findAll(filtros);
    res.status(200).json(casos);
};

const getCasoById = (req, res) => {
    const { id } = req.params;
    const caso = casosRepository.findById(id);
    if (!caso) {
        return sendErrorResponse(res, 404, 'Caso não encontrado.');
    }
    res.status(200).json(caso);
};

const getAgenteByCasoId = (req, res) => {
    const { caso_id } = req.params;
    const caso = casosRepository.findById(caso_id);
    if (!caso) {
        return sendErrorResponse(res, 404, 'Caso não encontrado.');
    }

    const agente = agentesRepository.findById(caso.agente_id);
    if (!agente) {
        // Inconsistência de dados, mas o agente pode ter sido removido
        return sendErrorResponse(res, 404, 'Agente responsável pelo caso não foi encontrado.');
    }

    res.status(200).json(agente);
};

const createCaso = (req, res) => {
    const { titulo, descricao, status, agente_id } = req.body;
    const errors = [];

    if (!titulo || !descricao || !status || !agente_id) {
        return sendErrorResponse(res, 400, 'Campos obrigatórios ausentes.');
    }
    
    if (status !== 'aberto' && status !== 'solucionado') {
        errors.push({ status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'" });
    }

    if (agentesRepository.findById(agente_id) === undefined) {
        errors.push({ agente_id: "O 'agente_id' fornecido não corresponde a um agente existente." });
    }

    if (errors.length > 0) {
        return sendErrorResponse(res, 400, "Parâmetros inválidos", errors);
    }

    const novoCaso = casosRepository.create({ titulo, descricao, status, agente_id });
    res.status(201).json(novoCaso);
};

const updateCaso = (req, res) => {
    const { id } = req.params;
    const caso = casosRepository.findById(id);

    if (!caso) {
        return sendErrorResponse(res, 404, 'Caso não encontrado.');
    }
    
    const { titulo, descricao, status, agente_id } = req.body;

    // Validação para PUT
    if (req.method === 'PUT' && (!titulo || !descricao || !status || !agente_id)) {
        return sendErrorResponse(res, 400, 'Para atualização completa (PUT), todos os campos são obrigatórios.');
    }

    const errors = [];
    if (status && (status !== 'aberto' && status !== 'solucionado')) {
        errors.push({ status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado'" });
    }

    if (agente_id && agentesRepository.findById(agente_id) === undefined) {
        errors.push({ agente_id: "O 'agente_id' fornecido não corresponde a um agente existente." });
    }

    if (errors.length > 0) {
        return sendErrorResponse(res, 400, "Parâmetros inválidos", errors);
    }
    
    const casoAtualizado = casosRepository.update(id, req.body);
    res.status(200).json(casoAtualizado);
};

const deleteCaso = (req, res) => {
    const { id } = req.params;
    const success = casosRepository.remove(id);
    if (!success) {
        return sendErrorResponse(res, 404, 'Caso não encontrado.');
    }
    res.status(204).send();
};


module.exports = {
    getAllCasos,
    getCasoById,
    getAgenteByCasoId,
    createCaso,
    updateCaso,
    deleteCaso
};