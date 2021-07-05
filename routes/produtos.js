const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Lendo um produto com GET de PRODUTOS.'
    });
});

router.get('/:id_produtos', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retornando um produto exclusivo.',
        id: req.params.id_produtos
    });
});

module.exports = router;