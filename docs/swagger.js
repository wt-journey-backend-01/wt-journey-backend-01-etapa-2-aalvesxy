const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API do Departamento de Polícia',
    version: '1.0.0',
    description: 'API para gerenciamento de casos e agentes policiais.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desenvolvimento',
    },
  ],
};

module.exports = swaggerDefinition;