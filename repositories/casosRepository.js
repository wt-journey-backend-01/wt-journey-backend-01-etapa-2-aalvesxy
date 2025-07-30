const { v4: uuidv4 } = require('uuid');

let casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "Homicídio no Bairro União",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "solucionado",
        agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1"
    },
    {
        id: "c2e1f2a3-2b4a-4c6d-8e9f-0a1b2c3d4e5f",
        titulo: "Furto de Veículo",
        descricao: "Um carro foi furtado na madrugada de hoje no centro da cidade.",
        status: "aberto",
        agente_id: "a2a7c8c8-2b83-4e6a-a297-5a1e8e5a7b1b"
    }
];

const findAll = (filters) => {
    let casosFiltrados = [...casos];
    
    if (filters.agente_id) {
        casosFiltrados = casosFiltrados.filter(caso => caso.agente_id === filters.agente_id);
    }

    if (filters.status) {
        casosFiltrados = casosFiltrados.filter(caso => caso.status.toLowerCase() === filters.status.toLowerCase());
    }

    if (filters.q) {
        const query = filters.q.toLowerCase();
        casosFiltrados = casosFiltrados.filter(caso => 
            caso.titulo.toLowerCase().includes(query) || 
            caso.descricao.toLowerCase().includes(query)
        );
    }
    
    return casosFiltrados;
};

const findById = (id) => {
    return casos.find(caso => caso.id === id);
};

const create = (caso) => {
    const novoCaso = { id: uuidv4(), ...caso };
    casos.push(novoCaso);
    return novoCaso;
};

const update = (id, casoData) => {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) {
        return null;
    }
    casos[index] = { ...casos[index], ...casoData };
    return casos[index];
};

const remove = (id) => {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) {
        return false;
    }
    casos.splice(index, 1);
    return true;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};