const agentesRepository = require('../repositories/agentesRepository');
const { sendErrorResponse } = require('../utils/errorHandler');

const validateDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
};

const getAllAgentes = (req, res) => {
    const { cargo, sort } = req.query;
    const filtros = {};
    if (cargo) filtros.cargo = cargo;
    if (sort) filtros.sort = sort;

    const agentes = agentesRepository.findAll(filtros);
    res.status(200).json(agentes);
};

const getAgenteById = (req, res) => {
    const { id } = req.params;
    const agente = agentesRepository.findById(id);
    if (!agente) {
        return sendErrorResponse(res, 404, 'Agente não encontrado.');
    }
    res.status(200).json(agente);
};

const createAgente = (req, res) => {
    const { nome, dataDeIncorporacao, cargo } = req.body;
    const errors = [];

    if (!nome || !dataDeIncorporacao || !cargo) {
        return sendErrorResponse(res, 400, 'Campos obrigatórios ausentes.');
    }

    if (!validateDate(dataDeIncorporacao)) {
        errors.push({ dataDeIncorporacao: "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'" });
    }

    if (errors.length > 0) {
        return sendErrorResponse(res, 400, "Parâmetros inválidos", errors);
    }

    const novoAgente = agentesRepository.create({ nome, dataDeIncorporacao, cargo });
    res.status(201).json(novoAgente);
};

const updateAgente = (req, res) => {
    const { id } = req.params;
    const agente = agentesRepository.findById(id);

    if (!agente) {
        return sendErrorResponse(res, 404, 'Agente não encontrado.');
    }

    // Remove 'id' do corpo da requisição para evitar que ele seja atualizado
    const { id: idDoBody, ...dadosParaAtualizar } = req.body;

    // Validação para PUT (todos os campos obrigatórios)
    if (req.method === 'PUT' && (!dadosParaAtualizar.nome || !dadosParaAtualizar.dataDeIncorporacao || !dadosParaAtualizar.cargo)) {
        return sendErrorResponse(res, 400, 'Para atualização completa (PUT), todos os campos são obrigatórios: nome, dataDeIncorporacao, cargo.');
    }
    
    const errors = [];
    if (dadosParaAtualizar.dataDeIncorporacao && !validateDate(dadosParaAtualizar.dataDeIncorporacao)) {
        errors.push({ dataDeIncorporacao: "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD' e não pode ser no futuro." });
    }

    if (errors.length > 0) {
        return sendErrorResponse(res, 400, "Parâmetros inválidos", errors);
    }
    
    const agenteAtualizado = agentesRepository.update(id, dadosParaAtualizar);
    res.status(200).json(agenteAtualizado);
};

const deleteAgente = (req, res) => {
    const { id } = req.params;
    const success = agentesRepository.remove(id);
    if (!success) {
        return sendErrorResponse(res, 404, 'Agente não encontrado.');
    }
    res.status(204).send();
};

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    deleteAgente
};