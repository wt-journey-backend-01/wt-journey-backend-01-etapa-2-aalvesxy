const express = require('express');
const agentesRouter = require('./routes/agentesRoutes');
const casosRouter = require('./routes/casosRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(agentesRouter);
app.use(casosRouter);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});