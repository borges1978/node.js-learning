const express = require('express');
const app = express();

const routeProdutos = require('./routes/produtos');

app.use('/produtos', routeProdutos);

app.use('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'OK! Deu certo!'
    });
});

module.exports = app;