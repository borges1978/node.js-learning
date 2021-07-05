const express = require('express');
const app = express();

const routeProdutos = require('./routes/produtos');
const routePedidos = require('./routes/pedidos');

app.use('/produtos', routeProdutos);
app.use('/pedidos', routePedidos);

app.use('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'OK! Deu certo!'
    });
});

module.exports = app;