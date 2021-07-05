const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorno dos pedidos.'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Criando um pedido.'
    });
});

module.exports = router;