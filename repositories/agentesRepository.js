const { v4: uuidv4 } = require('uuid');

let agentes = [
    {
        id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
        nome: "Rommel Carneiro",
        dataDeIncorporacao: "1992-10-04",
        cargo: "delegado"
    },
    {
        id: "a2a7c8c8-2b83-4e6a-a297-5a1e8e5a7b1b",
        nome: "Ana Oliveira",
        dataDeIncorporacao: "2015-03-12",
        cargo: "inspetor"
    }
];

const findAll = (filters) => {
    let agentesFiltrados = [...agentes];

    if (filters.cargo) {
        agentesFiltrados = agentesFiltrados.filter(agente => agente.cargo.toLowerCase() === filters.cargo.toLowerCase());
    }

    // LÓGICA DE FILTRO POR DATA
    if (filters.dataDeIncorporacao) {
        // Filtra agentes incorporados a partir da data fornecida
        agentesFiltrados = agentesFiltrados.filter(agente => new Date(agente.dataDeIncorporacao) >= new Date(filters.dataDeIncorporacao));
    }

    if (filters.sort === 'dataDeIncorporacao') {
        agentesFiltrados.sort((a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao));
    } else if (filters.sort === '-dataDeIncorporacao') {
        agentesFiltrados.sort((a, b) => new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao));
    }
    
    return agentesFiltrados;
};

const findById = (id) => {
    return agentes.find(agente => agente.id === id);
};

const create = (agente) => {
    const novoAgente = { id: uuidv4(), ...agente };
    agentes.push(novoAgente);
    return novoAgente;
};

const update = (id, agenteData) => {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index === -1) {
        return null;
    }
    agentes[index] = { ...agentes[index], ...agenteData };
    return agentes[index];
};

const remove = (id) => {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index === -1) {
        return false;
    }
    agentes.splice(index, 1);
    return true;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};