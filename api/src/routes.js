const express = require('express');
const routes = express.Router();

const Cliente = require('./controllers/cliente');
const Veiculo = require('./controllers/veiculo');
const Funcionario = require('./controllers/funcionario');
const Entrega = require('./controllers/entrega');
const Rota = require('./controllers/rota');
const Pedido = require('./controllers/pedido');

routes.get('/', (req, res) => {
    res.json("API Transportadora XPTO 1.0")
});

routes.post('/clientes', Cliente.addCliente);
routes.get('/clientes', Cliente.getClientes);
routes.get('/clientes/:id', Cliente.getClientes);
routes.put('/clientes', Cliente.updateCliente);
routes.delete('/clientes/:id', Cliente.deleteCliente);

routes.post('/veiculos', Veiculo.addVeiculo);
routes.get('/veiculos', Veiculo.getVeiculos);
routes.get('/veiculos/:placa', Veiculo.getVeiculos);
routes.put('/veiculos', Veiculo.updateVeiculo);
routes.delete('/veiculos/:placa', Veiculo.deleteVeiculo);

routes.post('/funcionario', Funcionario.addFuncionario);
routes.get('/funcionario', Funcionario.getFuncionario);
routes.get('/funcionario/:id', Funcionario.getFuncionario);
routes.put('/funcionario', Funcionario.updateFuncionario);
routes.delete('/funcionario/:id', Funcionario.deleteFuncionario);

routes.post('/entrega', Entrega.addEntrega);
routes.get('/entrega', Entrega.getEntrega);
routes.get('/entrega/:id', Entrega.getEntrega);
routes.put('/entrega', Entrega.updateEntrega);
routes.delete('/entrega/:id', Entrega.deleteEntrega);

routes.post('/rota', Rota.addRota);
routes.get('/rota', Rota.getRota);
routes.get('/rota/:id', Rota.getRota);
routes.put('/rota', Rota.updateRota);
routes.delete('/rota/:id', Rota.deleteRota);

routes.post('/pedido', Pedido.addPedido);
routes.get('/pedido', Pedido.getPedido);
routes.get('/pedido/:id', Pedido.getPedido);
routes.put('/pedido', Pedido.updatePedido);
routes.delete('/pedido/:id', Pedido.deletePedido);

module.exports = routes;