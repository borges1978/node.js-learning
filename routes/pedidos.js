const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    
    res.status(200).send({
        mensagem: 'Retorno dos pedidos.'
    });
});

router.post('/', (req, res, next) => {
    const pedido = {
        id_pedido: req.body.id_pedido,
        quantidade: req.body.preco
    }
    res.status(201).send({
        mensagem: 'Criando um pedido.',
        pedidoCriado: pedido
    });
});

module.exports = router;