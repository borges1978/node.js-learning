
const express = require('express');
const app = express();

const morgan = require('morgan');
//const bodyParser = require('body-parser');

const routeProdutos = require('./routes/produtos');
const routePedidos = require('./routes/pedidos');

app.use(morgan('dev'));


app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
            'Access-Control-Allow-Header', 
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('X-Powered-By', 'TESTE-EDSON');
    
    if (req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).send({});
    }
    next();
});


app.use('/produtos', routeProdutos);
app.use('/pedidos', routePedidos);

/*
app.use('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'OK! Deu certo!'
    });
});
*/

app.use((req, res, next) => {
    const erro = new Error('Não encontrado.');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
           mensagem: error.message
        }
    });
});

module.exports = app;